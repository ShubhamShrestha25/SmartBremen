"use client";

import { useState, useEffect } from "react";
import UsersTable from "./table/UsersTable";
import MarkersTable from "../MarkersTable";
import UsersChart from "./charts/UsersChart";
import LogoutBtn from "@/components/LogoutBtn";
import MarkersChart from "./charts/MarkersChart";
import {
  getFormattedMarkers,
  getAllUsers,
  getCategories,
} from "@/lib/firestore";
import CategoriesTable from "./table/CategoriesTable";
import TableTabs from "./TableTabs";

export default function AdminDashboard() {
  const [markersData, setMarkersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTable, setActiveTable] = useState("markers");

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
    <div className="space-y-8 md:space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
          Dashboard
        </h1>
        <LogoutBtn />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 md:flex-row">
            <UsersChart usersData={usersData} />
            <MarkersChart markersData={markersData} />
          </div>

          <div className="space-y-10">
            <TableTabs
              activeTable={activeTable}
              setActiveTable={setActiveTable}
            />

            {activeTable === "users" && (
              <UsersTable usersData={usersData} onRefresh={handleRefresh} />
            )}
            {activeTable === "markers" && (
              <MarkersTable
                markersData={markersData}
                categories={categories}
                onRefresh={handleRefresh}
                userProfile={usersData}
              />
            )}
            {activeTable === "categories" && (
              <CategoriesTable
                categoriesData={categories}
                onRefresh={handleRefresh}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
