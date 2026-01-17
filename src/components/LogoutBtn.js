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
      className="flex items-center gap-2 bg-[#FF4B4B] text-white py-2 px-5 rounded-xl cursor-pointer hover:border hover:border-[#FF4B4B] hover:bg-transparent hover:text-black"
    >
      <IoMdLogOut className="text-xl" /> Signout
    </button>
  );
};

export default LogoutBtn;
