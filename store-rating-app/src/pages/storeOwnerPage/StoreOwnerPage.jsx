import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreOwnerPage = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const navigation=useNavigate();
  const [allRatings, setAllRatings] = useState([]);
  const ownerId=localStorage.getItem("ownerId")
  const owner_name=localStorage.getItem("owner_name")

  // Fetch store data
  useEffect(() => {
    async function getStoreData(id) {
      try {
        console.log("Fetching store data for owner:", id);
        const res = await axios.get(
          `http://localhost:3001/storeOwner/storeData/${id}`
        );
        setStoreData(res.data);
        console.log("Data received:", res.data);
      } catch (err) {
        console.log("Failed to get store data", err);
      }
    }
    getStoreData(ownerId);
  }, []);

useEffect(() => {
  async function getAllRatings() {
    await axios
      .get("http://localhost:3001/user/ratingDataAll") // backend should return all ratings
      .then((res) => setAllRatings(res.data))
      .catch((err) => console.log("Failed to load all ratings", err));
  }
  getAllRatings();
},[]);

const storesWithAvgRating = storeData.map((store) => {
  const storeRatings = allRatings.filter(r => r.store_id === store.id);
  const avgRating = storeRatings.length > 0
    ? (storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length).toFixed(1)
    : "Not Rated";
  
  return { ...store, overallRating: avgRating };
});



  // Fetch ratings for a store
  const handleStoreRating = async (storeId) => {
    try {
      console.log("Fetching ratings for store:", storeId);
      const res = await axios.get(
        `http://localhost:3001/user/ratingData/${storeId}`
      );
      setRatingData(res.data);
      console.log("Ratings loaded:", res.data);
    } catch (err) {
      console.log("Failed to load store data", err);
    }
  };

  // Handle filtered ratings for both array or object responses
const filteredRatings = (() => {
  if (!selectedStore || !ratingData) return [];

  return ratingData.filter(
    (r) =>
      r.store_id === Number(selectedStore) &&
      r.user_name && // check that user_name exists
      r.user_name.toLowerCase().includes(searchUser.toLowerCase())
  );
})();



  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">

        <h2 className="text-2xl font-bold"> Store Owner Dashboard</h2>
        <nav className="space-y-4">
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500">Profile</li>
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> navigation("/user/editProfileOwner")}>Edit Profile</li>
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> setLogout(true)}>Logout</li>
        </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
  {/* Store Cards */}
  <h1 className="text-2xl font-bold mb-4">User ID : {ownerId} User Name ; {owner_name}</h1>
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Stores</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {storesWithAvgRating.map((store) => (
      <div
        key={store.id}
        className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <h3 className="text-xl font-semibold text-gray-900">{store.name}</h3>
        <p className="text-gray-500 mt-1">{store.address}</p>
        <div className="mt-4 flex items-center">
          <span className="text-lg font-bold text-blue-600">
            {store.overallRating}
          </span>
          <span className="text-yellow-400 ml-1 text-2xl">★</span>
          <span className="text-gray-500 ml-2">Overall Rating</span>
        </div>
      </div>
    ))}
  </div>

  {/* Store Selection */}
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">
      Select Store:
      <select
        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedStore}
        onChange={(e) => {
          setSelectedStore(e.target.value);
          handleStoreRating(e.target.value);
        }}
      >
        <option value="">-- Select --</option>
        {storeData.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </label>
  </div>

  {/* Search Filter */}
  {selectedStore && (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by user name..."
        className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
    </div>
  )}

  {/* Ratings List */}
  {selectedStore && (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">User Ratings</h3>
      {filteredRatings.length > 0 ? (
        <ul className="space-y-4">
          {filteredRatings.map((r, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
            >
              <span className="text-gray-700">{r.user_name}</span>
              <span className="font-bold text-lg text-blue-600 flex items-center">
                {r.rating}
                <span className="text-yellow-400 ml-1">★</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No ratings found for this store.</p>
      )}
    </div>
  )}
</div>
    </div>
  );
};

export default StoreOwnerPage;
