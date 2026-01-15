"use client";

import MarkersChart from "./charts/MarkersChart";
import UsersChart from "./charts/UsersChart";
import Marker from "./table/Markers";
import Users from "./table/Users";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="flex gap-6">
        <UsersChart />
        <MarkersChart />
      </div>

      <div className="space-y-10">
        <Users />
        <Marker />
      </div>
    </div>
  );
}
