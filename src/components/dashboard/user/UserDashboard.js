"use client";

import Marker from "./Markers";
import UserDetails from "./UserDetails";
import LogoutBtn from "@/components/LogoutBtn";

export default function UserDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <UserDetails />
        <LogoutBtn />
      </div>
      <Marker />
    </div>
  );
}
