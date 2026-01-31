"use client";

import { getUserProfile } from "@/lib/firestore";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { role, userId } = useAuthStore();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthActive =
    pathname === "/auth/login" || pathname === "/auth/register";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const profile = await getUserProfile(userId);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const getInitials = userProfile?.name
    ?.trim()
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .filter((_, index, arr) => index === 0 || index === arr.length - 1)
    .join("")
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-center bg-white lg:h-20">
      <div className="mainContainer flex items-center justify-between">
        <Link href="/" className="w-[120px] lg:w-[155px]">
          <Image
            src="/images/logo1.png"
            alt="Smart Bremen"
            width={149}
            height={60}
            className="h-auto w-full"
            priority
          />
        </Link>

        <div className="flex items-center gap-5 lg:gap-20">
          <ul className="flex gap-5 text-xs uppercase text-[#45414F] lg:gap-20 lg:text-base">
            <li>
              <Link
                className={pathname === "/about" ? "text-[#FF4B4B]" : ""}
                href="/about"
              >
                about
              </Link>
            </li>

            <li>
              <Link
                className={pathname === "/help" ? "text-[#FF4B4B]" : ""}
                href="/help"
              >
                help
              </Link>
            </li>

            {!role && (
              <li>
                <Link
                  className={isAuthActive ? "text-[#FF4B4B]" : ""}
                  href="/auth/login"
                >
                  login
                </Link>
              </li>
            )}
          </ul>

          {role && (
            <Link href="/auth/dashboard" aria-label="Open dashboard">
              {loading ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#FF4B4B] text-xs font-bold lg:h-8 lg:w-8 lg:text-sm">
                  XX
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#FF4B4B] text-xs font-bold lg:h-8 lg:w-8 lg:text-sm">
                  {getInitials}
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
