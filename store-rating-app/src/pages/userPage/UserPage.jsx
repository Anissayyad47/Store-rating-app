import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";

const user={
  user_id:6,
  user_name:"anisowner"
}

export default function UserPage() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [search, setSearch] = useState("");
  const [storeData ,setStoreData]=useState([]);
  const [ratingData, setRatingData]=useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [value, setValue]=useState(false)
  const navigation=useNavigate();
  const [logout, setLogout]=useState(false);
  const [userRating, setUserRating]=useState("Not Rated")
  const user_id=localStorage.getItem("userId")
  const user_name=localStorage.getItem("user_name")

  useEffect(()=> {
    async function getStoreData(){
        await axios.get("http://localhost:3001/user/storeData")
        .then((res)=> setStoreData(res.data))
        .catch((err)=> console.log("Failed to lead store data ",err))
    }
    getStoreData();
  },[value])


useEffect(() => {
  async function getAllRatings() {
    await axios
      .get("http://localhost:3001/user/ratingDataAll") // backend should return all ratings
      .then((res) => setAllRatings(res.data))
      .catch((err) => console.log("Failed to load all ratings", err));
  }
  getAllRatings();
},[value]);


const storesWithAvgRating = storeData.map((store) => {
  // All ratings for this store
  const storeRatings = allRatings.filter(r => r.store_id === store.id);

  let avgRating = "Not Rated";
  let userRating = "Not Rated";

  if (storeRatings.length > 0) {
    // Calculate average rating
    avgRating = (
      storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length
    ).toFixed(1);

    // Find current user's rating
    const ratingByUser = storeRatings.find(r => r.user_id == user_id );
    if (ratingByUser) {
      userRating = ratingByUser.rating;
    }
  }
  console.log("Store : ",{...store,overallRating:avgRating,userRating:userRating});
  
  return {
    ...store,
    overallRating: avgRating,
    userRating: userRating
  };
});



const filteredStores = storesWithAvgRating.filter(
  (store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
);

  const handleAddRating = (storeId) => {
    const ratingData={
      user_id:user_id,
      store_id:storeId,
      rating:newRating,
      user_name:user_name,
    }
    console.log(`User submitted rating ${newRating} for store: ${selectedStore?.name}`);
    console.log("Rating data ",ratingData);
    setShowRatingForm(false);
    async function addRatings(){
        await axios.post(`http://localhost:3001/user/addRatings`,ratingData)
        .then((res)=> alert("rating updated")
        )
        .catch((err)=> console.log("Failed to lead store data ",err))
    }
    addRatings();
  };

  const handleStoreRating = (userId) => {
    console.log("User Id is : ",userId);
    async function getRatingData(){
        await axios.get(`http://localhost:3001/user/ratingData/${userId}`)
        .then((res)=> setRatingData(res.data))
        .catch((err)=> console.log("Failed to lead store data ",err))
    }
    getRatingData();
  };

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold"> User Dashboard</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500">Profile</li>
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> navigation("/user/editProfile")}>Edit Profile</li>
          <li className="cursor-pointer hover:text-blue-500" onClick={()=> setLogout(true)}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">User ID : {user_id} User Name ; {user_name}</h1>
        <h1 className="text-2xl font-bold mb-4">Available Stores</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or address"
          className="border p-2 rounded w-full mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Store List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600">{store.address}</p>
              <p className="mt-2">
                <strong>Overall Rating:</strong> {store.overallRating} ⭐
              </p>
              <p>
                <strong>Your Rating:</strong> {store.userRating ?? "Not Rated"}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedStore(store);
                    handleStoreRating(store.id)
                    setShowReviews(true);
                    setValue(prev => !prev)
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Reviews
                </button>
                <button
                  onClick={() => {
                    setSelectedStore(store);
                    setValue(prev => !prev)
                    setShowRatingForm(true);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add / Edit Rating
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviews && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Reviews for <span className="text-blue-600">{selectedStore.name}</span>
            </h2>

            {/* Reviews List */}
            <div className="max-h-60 overflow-y-auto space-y-3">
              {ratingData.length > 0 ? (
                ratingData.map((review, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.user_name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rating: {review.rating} ⭐
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No reviews yet.</p>
              )}
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={() => {setShowReviews(false); setValue(prev => !prev)}}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add/Edit Rating Modal */}
      {showRatingForm && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Rate {selectedStore.name}
            </h2>

            {/* Slider input */}
            <input
              type="range"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full accent-green-500"
            />

            {/* Show rating number */}
            <p className="text-center mt-2 font-medium">
              {newRating} / 5
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {handleAddRating(selectedStore.id);setValue(prev => !prev)}}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => {setShowRatingForm(false) ;setValue(prev => !prev)}}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {logout && (<LogoutPopup setLogout={setLogout}></LogoutPopup>)}
    </div>
  );
}
