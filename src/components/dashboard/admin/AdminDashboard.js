"use client";

import { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import MarkersTable from "../MarkersTable";
import UsersChart from "./charts/UsersChart";
import LogoutBtn from "@/components/LogoutBtn";
import MarkersChart from "./charts/MarkersChart";
import { getFormattedMarkers, getAllUsers, getCategories } from "@/lib/firestore";

export default function AdminDashboard() {
  const [markersData, setMarkersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const [markers, users, cats] = await Promise.all([
        getFormattedMarkers(), // Gets all images formatted for frontend
        getAllUsers(),
        getCategories(),
      ]);
      setMarkersData(markers);
      setUsersData(users);
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Callback to refresh data after actions
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <LogoutBtn />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="flex gap-6">
            <UsersChart usersData={usersData} />
            <MarkersChart markersData={markersData} />
          </div>

          <div className="space-y-10">
            <UsersTable usersData={usersData} onRefresh={handleRefresh} />
            <MarkersTable 
              markersData={markersData} 
              categories={categories}
              onRefresh={handleRefresh} 
            />
          </div>
        </>
      )}
    </div>
  );
}
