"use client";

import UsersTable from "./UsersTable";
import MarkersTable from "../MarkersTable";
import UsersChart from "./charts/UsersChart";
import LogoutBtn from "@/components/LogoutBtn";
import MarkersChart from "./charts/MarkersChart";
import { fakeData } from "@/data/fakeData";

export default function AdminDashboard() {

  // Admin has access to all data
  const unfilteredMarkersData = fakeData;

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
          Dashboard
        </h1>
        <LogoutBtn />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <UsersChart />
        <MarkersChart />
      </div>
      
      <div className="space-y-10">
        <UsersTable />
        <MarkersTable markersData={unfilteredMarkersData} />
      </div>
    </div>
  );
}
