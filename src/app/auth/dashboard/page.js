"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import UserDashboard from "@/components/dashboard/user/UserDashboard";

export default function Dashboard() {
  const { role } = useAuthStore();
  const router = useRouter();

  // Check whether the user is logged in
  useEffect(() => {
    if (role === null) {
      router.push("/");
    }
  }, [role, router]);

  if (role === null) return null;

  return (
    <div className="flex justify-center py-8 md:py-10">
      {/* Display the dashboard based on the user’s role */}
      <div className="mainContainer overflow-hidden">
        {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
