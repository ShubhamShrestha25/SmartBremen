"use client";
import useAuthStore from "@/store/useAuthStore";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function Dashboard() {
  const { role } = useAuthStore();

  return (
    <div className="flex justify-center py-10">
      <div className="mainContainer">
        {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
