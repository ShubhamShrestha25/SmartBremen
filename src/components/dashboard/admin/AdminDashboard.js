"use client";

import UsersTable from "./UsersTable";
import MarkersTable from "../MarkersTable";
import UsersChart from "./charts/UsersChart";
import LogoutBtn from "@/components/LogoutBtn";
import MarkersChart from "./charts/MarkersChart";
import { fakeData } from "@/data/fakeData";

export default function AdminDashboard() {
  const unfilteredMarkersData = fakeData;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <LogoutBtn />
      </div>
      <div className="flex gap-6">
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
