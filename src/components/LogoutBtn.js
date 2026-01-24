"use client";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const LogoutBtn = () => {
  const router = useRouter();
  const { setRole } = useAuthStore();

  const logoutHandler = () => {
    setRole(null);
    router.push("/");
  };
  return (
    <button
      onClick={logoutHandler}
      className="flex items-center gap-2 bg-[#FF4B4B] text-white py-1.5 px-3 rounded-xl cursor-pointer hover:border hover:border-[#FF4B4B] hover:bg-transparent text-sm md:text-base hover:text-black md:py-2 md:px-5"
    >
      <IoMdLogOut className="text-lg md:text-xl" /> Signout
    </button>
  );
};

export default LogoutBtn;
