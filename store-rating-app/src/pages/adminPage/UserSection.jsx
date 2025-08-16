import React, { useState,useEffect } from "react";
import axios from "axios";


function UsersSection({ users, onAddUser }) {
    const [filterType, setFilterType] = useState("name");
    const [filterValue, setFilterValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData]=useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "normal" });
    const [errors, setErrors] = useState({});

    
    useEffect(()=> {
    const fetchUserData = async () => {
        try {
        const res = await axios.get("http://localhost:3001/admin/userData");
        setUserData(res.data);
        
        } catch (err) {
        alert("Error while retrieving user data");
        console.error(err);
        }
    };

    fetchUserData();
    },[])

    const filteredUsers = userData.filter((user) => {
        if (!filterValue) return true;
        return user[filterType]?.toLowerCase().includes(filterValue.toLowerCase());
    });

    const validateForm = () => {
        const newErrors = {};

        if (newUser.name.length < 5 || newUser.name.length > 60) {
        newErrors.name = "Name must be between 20 and 60 characters.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
        newErrors.email = "Please enter a valid email.";
        }

        if (
        newUser.password.length < 8 ||
        newUser.password.length > 16 ||
        !/[A-Z]/.test(newUser.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(newUser.password)
        ) {
        newErrors.password =
            "Password must be 8-16 characters, include at least one uppercase letter and one special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddUserSubmit =async () => {
        if (!validateForm()) return;
        console.log("Adding user:", newUser);
        onAddUser(newUser);
        setShowModal(false);
        console.log("User Data ",newUser);
        
        setNewUser({ name: "", email: "", password: "", role: "normal" });
        try{
            await axios.post("http://localhost:3001/admin/addUser",newUser)
            .then((res)=> {
                alert(res.data.message)
            }).catch((err)=> {
                if (err.response) {
                alert(err.response.data.message);
                } else {
                alert(err.message)}
                })
            }catch (err){
        console.error("Error while Login : ",err);
        }
    };

    return (
        <div className="flex-1 bg-gray-100 p-4 rounded shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Users</h2>
            <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-3 py-1 rounded"
            >
            Add User
            </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
            <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-2 py-1 rounded"
            >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
            </select>
            <input
            type="text"
            placeholder={`Filter by ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
            />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
            <thead>
                <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Email</th>
                {/* <th className="px-2 py-1">Address</th> */}
                <th className="px-2 py-1">Role</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((u) => (
                <tr key={u.id}>
                    <td className="border px-2 py-1">{u.name}</td>
                    <td className="border px-2 py-1">{u.email}</td>
                    {/* <td className="border px-2 py-1">{u.address}</td> */}
                    <td className="border px-2 py-1">{u.role}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Add User Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-[600px]">
                <h3 className="text-xl font-semibold mb-6">Add User</h3>

                <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-1"
                />
                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-1"
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-1"
                />
                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

                <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="border px-3 py-2 rounded w-full mb-4"
                >
                <option value="normal">Normal User</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
                </select>

                <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                    Cancel
                </button>
                <button
                    onClick={handleAddUserSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Add
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default UsersSection;
