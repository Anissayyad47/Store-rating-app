import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";


export default function LogoutPopup({setLogout}) {
    const navigation=useNavigate();
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, redirect)
    alert("Logged out!");
    localStorage.clear("admin");
    localStorage.clear("admin_name");
    navigation("/")
    setLogout(true)
  };

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setLogout(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
