"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import UserDashboard from "@/components/dashboard/user/UserDashboard";

export default function Dashboard() {
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (role === null) {
      router.push("/");
    }
  }, [role, router]);

  if (role === null) return null;

  return (
    <div className="flex justify-center py-10">
      <div className="mainContainer">
        {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
