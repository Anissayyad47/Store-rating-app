const pool = require('../config/db'); // make sure this is promise-based
const bcrypt = require('bcrypt')

const addUser=async(req, res)=> {
    const { name, email, password,role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userExit] = await pool.promise().query(
            "SELECT * FROM users WHERE name=? OR email=?",
            [name, email]
        );
        
        if (userExit.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 5);

        await pool.promise().query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?,?)",
            [name, email, hashedPassword,role]
        );
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const addStore=async(req, res)=> {
    const { name, email, address,ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userExit] = await pool.promise().query(
            "SELECT * FROM stores WHERE  email=?",
            [email]
        );

        if (userExit.length > 0) {
            return res.status(400).json({ message: 'store already exists' });
        }

        await pool.promise().query(
            "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?,?)",
            [name, email, address,ownerId]
        );
        res.status(201).json({ message: 'store is created' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getUserData=async(req, res)=> {
    const [userData]=await pool.promise().query("SELECT * FROM users")
    res.status(200).json(userData);
}

const getOwnerData=async(req, res)=> {
    const [userData]=await pool.promise().query("SELECT * FROM users WHERE role='store_owner' ")
    res.status(200).json(userData);
}

const getStoreData=async(req, res)=> {
    const [userData]=await pool.promise().query("SELECT * FROM stores")
    res.status(200).json(userData);
}

const getTotalData = async (req, res) => {
  const [users] = await pool.promise().query("SELECT COUNT(*) AS count FROM users");
  const [stores] = await pool.promise().query("SELECT COUNT(*) AS count FROM stores");
  const [ratings] = await pool.promise().query("SELECT COUNT(*) AS count FROM ratings");

  const totalData = {
    totalUser: users[0].count,
    totalStores: stores[0].count,
    totalRatings: ratings[0].count
  };

  console.log("DATA ", totalData);
  res.status(200).json(totalData);
};


module.exports={addUser,getUserData, getOwnerData,addStore,getStoreData, getTotalData};