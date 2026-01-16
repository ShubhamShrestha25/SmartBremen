"use client";
import useAuthStore from "@/store/useAuthStore";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import UserDashboard from "@/components/dashboard/user/UserDashboard";

import { FaUserSecret, FaRegUser } from "react-icons/fa";

export default function Dashboard() {
  const { role, setRole } = useAuthStore();

  return (
    <div>
      <div className="flex justify-center py-10">
        <div className="mainContainer">
          <div className="text-2xl flex justify-end items-center gap-4 mb-5">
            <FaRegUser
              className={`${
                role === "USER" ? "text-black" : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setRole("USER")}
            />
            <FaUserSecret
              className={`${
                role === "ADMIN" ? "text-black" : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setRole("ADMIN")}
            />
          </div>
          {role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
        </div>
      </div>
    </div>
  );
}
