"use client";

import { fakeData } from "@/data/fakeData";
import MarkerTable from "../MarkersTable";
import UserDetails from "./UserDetails";
import LogoutBtn from "@/components/LogoutBtn";
import useAuthStore from "@/store/useAuthStore";

export default function UserDashboard() {
  const { userId } = useAuthStore();

  console.log(userId);

  const filteredMarkersData = fakeData.filter(
    (item) => item.author.authorId === userId,
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <UserDetails />
        <LogoutBtn />
      </div>
      <MarkerTable markersData={filteredMarkersData} />
    </div>
  );
}
