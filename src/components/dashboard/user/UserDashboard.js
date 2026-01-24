"use client";

import { fakeData } from "@/data/fakeData";
import MarkerTable from "../MarkersTable";
import UserDetails from "./UserDetails";
import LogoutBtn from "@/components/LogoutBtn";
import useAuthStore from "@/store/useAuthStore";

export default function UserDashboard() {
  const { userId } = useAuthStore();

  const filteredMarkersData = fakeData.filter((item) => item.userId === userId);

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <UserDetails />
        <LogoutBtn />
      </div>
      <MarkerTable markersData={filteredMarkersData} />
    </div>
  );
}
