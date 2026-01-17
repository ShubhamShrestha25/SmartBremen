"use client";

import { IoMdLogOut } from "react-icons/io";
import MarkersChart from "./charts/MarkersChart";
import UsersChart from "./charts/UsersChart";
import Marker from "./table/Markers";
import Users from "./table/Users";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button className="flex items-center gap-2 bg-[#FF4B4B] text-white py-2 px-5 rounded-xl cursor-pointer hover:border hover:border-[#FF4B4B] hover:bg-transparent hover:text-black">
          <IoMdLogOut className="text-xl" /> Signout
        </button>
      </div>
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
