"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const LogoutBtn = () => {
  const router = useRouter();
  const { setRole, setUserId } = useAuthStore();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setRole(null);
      setUserId(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
