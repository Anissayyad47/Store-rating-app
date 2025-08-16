import React, { useState, useEffect } from "react";
import axios from "axios";
// const owners=
// [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Alice Smith" }
// ]


function StoreSection({ stores,  onAddStore }) {
    const [filterType, setFilterType] = useState("name");
    const [filterValue, setFilterValue] = useState("");
    const [owners,setOnwners]=useState([]);
    const [storeData,setStoreData]=useState([]);
    const [showModal, setShowModal] = useState(false);
    const [allRatings, setAllRatings] = useState([]);
    const [newStore, setNewStore] = useState({
        name: "",
        email: "",
        address: "",
        ownerId: "",
    });
    const [errors, setErrors] = useState({});
    const [ownerSearch, setOwnerSearch] = useState("");

    useEffect(()=> {
    const fetchUserData = async () => {
        try {
        const res = await axios.get("http://localhost:3001/admin/store_ownerData");
        setOnwners(res.data);
        } catch (err) {
        alert("Error while retrieving user data");
        console.error(err);
        }
    };
    fetchUserData();
    },[])

    useEffect(()=> {
    const fetchUserData = async () => {
        try {
        const res = await axios.get("http://localhost:3001/admin/storeData");
        setStoreData(res.data);
        
        } catch (err) {
        alert("Error while retrieving user data");
        console.error(err);
        }
    };

    fetchUserData();
    },[])

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

const filteredStores = storesWithAvgRating.filter(
  (store) =>
    store.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    store.address.toLowerCase().includes(filterValue.toLowerCase())
);
  // Filtering store list
    // const filteredStores = storeData.filter((store) => {
    //     if (!filterValue) return true;
    //     return store[filterType].toLowerCase().includes(filterValue.toLowerCase());
    // });

    // Filtering owners for dropdown search
    const filteredOwners = owners.filter(
        (o) =>
        o.name.toLowerCase().includes(ownerSearch.toLowerCase()) ||
        o.id.toString().includes(ownerSearch)
    );

    const validateForm = () => {
        const newErrors = {};

        if (newStore.name.length < 5 || newStore.name.length > 60) {
        newErrors.name = "Name must be between 5 and 60 characters.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStore.email)) {
        newErrors.email = "Please enter a valid email.";
        }

        if (newStore.address.length > 400) {
        newErrors.address = "Address cannot exceed 400 characters.";
        }

        if (!newStore.ownerId) {
        newErrors.ownerId = "Please select a store owner.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddStoreSubmit = async () => {
        if (!validateForm()) return;
        console.log("Adding store:", newStore);
        onAddStore(newStore);
        setShowModal(false);
        setNewStore({ name: "", email: "", address: "", ownerId: "" });
        setOwnerSearch("");

        try{
            await axios.post("http://localhost:3001/admin/addStore",newStore)
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
        {/* Header with Add Store */}
        <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Stores</h2>
            <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
            >
            Add Store
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
            <option value="address">Address</option>
            </select>
            <input
            type="text"
            placeholder={`Filter by ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
            />
        </div>

        {/* Stores Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
            <thead>
                <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Address</th>
                <th className="px-2 py-1">Rating</th>
                </tr>
            </thead>
            <tbody>
                {filteredStores.map((s) => (
                <tr key={s.id}>
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1">{s.email}</td>
                    <td className="border px-2 py-1">{s.address}</td>
                    <td className="border px-2 py-1">{s.overallRating} ⭐ </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Add Store Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-semibold mb-6">Add Store</h3>

                {/* Name */}
                <input
                type="text"
                placeholder="Name"
                value={newStore.name}
                onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                }
                className="border px-3 py-2 rounded w-full mb-1"
                />
                {errors.name && (
                <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                )}

                {/* Email */}
                <input
                type="email"
                placeholder="Email"
                value={newStore.email}
                onChange={(e) =>
                    setNewStore({ ...newStore, email: e.target.value })
                }
                className="border px-3 py-2 rounded w-full mb-1"
                />
                {errors.email && (
                <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                )}

                {/* Address */}
                <textarea
                placeholder="Address"
                value={newStore.address}
                onChange={(e) =>
                    setNewStore({ ...newStore, address: e.target.value })
                }
                className="border px-3 py-2 rounded w-full mb-1"
                rows={4}
                />
                {errors.address && (
                <p className="text-red-500 text-sm mb-4">{errors.address}</p>
                )}

                {/* Owner Selection */}
                <div className="mb-2">
                <label className="block mb-1 font-medium">Select Store Owner</label>
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    value={ownerSearch}
                    onChange={(e) => setOwnerSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-2"
                />
                <select
                    value={newStore.ownerId}
                    onChange={(e) =>
                    setNewStore({ ...newStore, ownerId: e.target.value })
                    }
                    className="border px-3 py-2 rounded w-full"
                >
                    <option value="">-- Select Owner --</option>
                    {filteredOwners.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.name} (ID: {o.id})
                    </option>
                    ))}
                </select>
                {errors.ownerId && (
                    <p className="text-red-500 text-sm mt-1">{errors.ownerId}</p>
                )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddStoreSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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

export default StoreSection;
