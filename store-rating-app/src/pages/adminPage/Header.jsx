import React, { useState } from "react";
import LogoutPopup from "./LogoutPopup";
import { useNavigate } from "react-router-dom";

function Header() {
  const [logout, setLogout]=useState(false);
  const navigation=useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div>
        <button className="ml-4 bg-red-500 px-3 py-1 rounded" onClick={()=> setLogout(true)}>Logout</button>
      </div>
      {logout && (<LogoutPopup setLogout={setLogout}></LogoutPopup>)}
    </div>
  );
}

export default Header;
