import axios from "axios";
import React, { useEffect, useState } from "react";

function SummaryCards({ totalUsers, totalStores, totalRatings }) {
  const [total, setTotal]=useState([]);
  useEffect(() => {
    async function getTotals() {
      try {
        const res = await axios.get("http://localhost:3001/admin/total_data");
        setTotal(res.data); // now res.data is a clean object with numbers
      } catch (err) {
        alert("Failed to load total user data");
      }
    }
    getTotals();
  }, []);

  console.log(total); // will log null on first render, then your object

  const adminId=localStorage.getItem("adminId")
  const admin_name=localStorage.getItem("admin_name")
  return (
    <>
    <h1 className="text-2xl font-bold mb-4">User ID : {adminId} User Name ; {admin_name}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <div className="p-4 bg-white shadow rounded">Total Users: {total.totalUser}</div>
      <div className="p-4 bg-white shadow rounded">Total Stores: {total.totalStores}</div>
      <div className="p-4 bg-white shadow rounded">Total Ratings: {total.totalRatings}</div>
    </div>
    </>
  );
}

export default SummaryCards;
