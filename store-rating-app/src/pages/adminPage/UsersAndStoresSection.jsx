import React from "react";

function UsersAndStoresSection({ users, stores, onAddUser, onAddStore }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">

      {/* Users Section */}
      <div className="flex-1 bg-gray-100 p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Users</h2>
          <button onClick={onAddUser} className="bg-blue-500 text-white px-3 py-1 rounded">Add User</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Address</th>
                <th className="px-2 py-1">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="border px-2 py-1">{u.name}</td>
                  <td className="border px-2 py-1">{u.email}</td>
                  <td className="border px-2 py-1">{u.address}</td>
                  <td className="border px-2 py-1">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stores Section */}
      <div className="flex-1 bg-gray-100 p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Stores</h2>
          <button onClick={onAddStore} className="bg-blue-500 text-white px-3 py-1 rounded">Add Store</button>
        </div>
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
              {stores.map(s => (
                <tr key={s.id}>
                  <td className="border px-2 py-1">{s.name}</td>
                  <td className="border px-2 py-1">{s.email}</td>
                  <td className="border px-2 py-1">{s.address}</td>
                  <td className="border px-2 py-1">{s.avgRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default UsersAndStoresSection;
