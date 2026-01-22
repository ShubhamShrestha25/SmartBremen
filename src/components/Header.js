"use client";

import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { role } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 flex justify-center items-center h-15 bg-white lg:h-20">
      <div className="mainContainer flex justify-between items-center">
        <Link href="/" className="w-[120px] lg:w-[155px]">
          <Image
            src="/images/logo1.png"
            alt=""
            width={149}
            height={60}
            className="w-full h-auto"
          />
        </Link>
        <div className="flex items-center  gap-5 lg:gap-20">
          <div>
            <ul className="uppercase flex gap-5 text-[#45414F] text-xs lg:text-base lg:gap-20">
              <Link
                className={pathname === "/about" ? "text-[#FF4B4B]" : ""}
                href="/about"
              >
                <li>about</li>
              </Link>
              <Link
                className={pathname === "/help" ? "text-[#FF4B4B]" : ""}
                href="/help"
              >
                <li>help</li>
              </Link>
              {!role && (
                <Link
                  className={
                    pathname === "/auth/login" || "/auth/register"
                      ? "text-[#FF4B4B]"
                      : ""
                  }
                  href="/auth/login"
                >
                  <li>login</li>
                </Link>
              )}
            </ul>
          </div>
          {role && (
            <Link href="/auth/dashboard">
              <div className="h-6 w-6 rounded-full flex items-center justify-center font-bold border border-[#FF4B4B] text-xs lg:text-sm lg:h-8 lg:w-8">
                JD
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
