import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigation=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3001/auth/login", formData);


    // Save token in localStorage
    localStorage.setItem("token", res.data.token);

    console.log("user id ", res.data.user_name);
    
    // Redirect based on role
    if (res.data.role === "admin") {
      localStorage.setItem("adminId", res.data.userId);
      localStorage.setItem("admin_name", res.data.user_name);
      alert("Login Successful, you’re redirecting to Admin Dashboard page...")
      navigation("/admin");
    } else if (res.data.role === "store_owner") {
      localStorage.setItem("ownerId", res.data.userId);
      localStorage.setItem("owner_name", res.data.user_name);
      alert("Login Successful, you’re redirecting to Store page...")
      navigation("/storeOwner");
    } else if (res.data.role === "normal") {
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("user_name", res.data.user_name);
      alert("Login Successful, you’re redirecting to user page...")
      navigation("/user");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-200"
            >
                Login
            </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
            </Link>
            </p>
        </div>
        </div>
    );
}
