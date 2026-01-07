"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center h-20 bg-white">
      <div className="mainContainer flex justify-between items-center">
        <Link href="/" className="w-[155px] h-[65px]">
          <Image
            src="/images/logo1.png"
            alt=""
            width={149}
            height={60}
            className="w-full h-auto"
          />
        </Link>
        <div>
          <ul className="uppercase flex gap-[90px] text-[#45414F]">
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
            <Link
              className={pathname === "/login" ? "text-[#FF4B4B]" : ""}
              href="/login"
            >
              <li>login</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
