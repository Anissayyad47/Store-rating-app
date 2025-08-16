// AdminDashboard.jsx
import React from "react";
import Header from "./Header";
import SummaryCards from "./SummaryCards";
import UsersAndStoresSection from "./UsersAndStoresSection";
import UserSection from "./UserSection";
import StoreSection from "./StoreSection";
import { sampleUsers, sampleStores, sampleTotals } from "./sampleData";

export default function AdminPage() {
    const adminUser = { name: "Admin User", role: "admin" };

    return (
        <div className="min-h-screen bg-gray-50">
        <Header  />
        <SummaryCards {...sampleTotals} />

        <div className="flex flex-col lg:flex-row gap-4 p-4">
            <UserSection 
            users={sampleUsers} 
            onAddUser={(u) => console.log("New User:", u)} 
            />
            <StoreSection 
            stores={sampleStores} 
            onAddStore={(s) => console.log("New Store:", s)} 
            />
        </div>
        </div>
    );
}




