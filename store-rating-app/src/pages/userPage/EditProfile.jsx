import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";
import axios from "axios";


export default function EditProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [logout, setLogout]=useState(false);
  const navigation = useNavigate();

  const userId=localStorage.getItem("userId");
  const handleUpdatePass= async()=> {
    await axios.post("http://localhost:3001/auth/update",{oldPassword:oldPassword,newPassword:newPassword,userId:userId})
    .then((res)=> alert("Changes Updated"))
    .catch((err)=> alert("Incorect Password"))
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold"> User Dashboard</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> navigation("/user")}>Profile</li>
          <li
            className="cursor-pointer hover:text-blue-500"
            
          >
            Edit Profile
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> setLogout(true)}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

          {/* Change Password Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Change Password</h3>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" onClick={handleUpdatePass}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {logout && (<LogoutPopup setLogout={setLogout}></LogoutPopup>)}
    </div>
  );
}
