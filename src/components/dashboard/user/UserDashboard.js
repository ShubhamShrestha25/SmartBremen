"use client";

import Marker from "./Markers";
import UserDetails from "./UserDetails";

export default function UserDashboard() {
  return (
    <div className="space-y-10">
      <UserDetails />
      <Marker />
    </div>
  );
}
