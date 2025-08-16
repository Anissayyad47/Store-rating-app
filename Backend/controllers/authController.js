const pool = require('../config/db'); // make sure this is promise-based
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "anis123"; // put in .env for production


const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userExist] = await pool.promise().query(
            "SELECT * FROM users WHERE name=? OR email=?",
            [username, email]
        );

        if (userExist.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.promise().query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [username, email, hashedPassword, "normal"]
        );

        // Get inserted ID
        const userId = result.insertId;

        // Generate JWT token
        const token = jwt.sign(
            { id: userId, email, role: "normal" },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            role: "normal",
            userId,
            user_name: username
        });

        console.log("User Id:", userId);
        console.log("User name:", username);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const [userExit] = await pool.promise().query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (userExit.length === 0) {
            return res.status(400).json({ message: 'Invalid Credential' });
        }
        const isMatch = await bcrypt.compare(password, userExit[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: userExit[0].id, email: userExit[0].email, role: userExit[0].role },
            SECRET_KEY,
            { expiresIn: "1h" } // token expires in 1 hour
        );

        res.status(200).json({
            message: `Login successful ${userExit[0].role}`,
            role: userExit[0].role,
            token,
            userId:userExit[0].id,
            user_name:userExit[0].name
        });
        console.log("user id ",userExit[0].id);
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updataPass = async (req, res) => {
    const { oldPassword, newPassword, userId } = req.body;
    console.log("Update Data", oldPassword, newPassword, userId);

    if (!oldPassword || !newPassword || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userData] = await pool.promise().query("SELECT * FROM users WHERE id=?", [userId]);

        if (userData.length === 0) {
            return res.status(400).json({ message: 'Invalid USER ID' });
        }

        const isMatch = await bcrypt.compare(oldPassword, userData[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong Password' });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);
        await pool.promise().query("UPDATE users SET password = ? WHERE id = ?", [hashPass, userId]);

        return res.status(200).json({ message: 'Password is updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports={login, signup, updataPass}
