"use client";

import Marker from "./Markers";
import UserDetails from "./UserDetails";

import { IoMdLogOut } from "react-icons/io";

export default function UserDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <UserDetails />
        <button className="flex items-center gap-2 bg-[#FF4B4B] text-white py-2 px-5 rounded-xl cursor-pointer hover:border hover:border-[#FF4B4B] hover:bg-transparent hover:text-black">
          <IoMdLogOut className="text-xl" /> Signout
        </button>
      </div>
      <Marker />
    </div>
  );
}
