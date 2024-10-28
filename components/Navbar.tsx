"use client";

import { Button, Spinner } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome, FaSearch, FaUserFriends } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { data, status, update } = useSession();
  console.log(status);

  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT  */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          <p className=" text-nowrap">Snap@FOMO</p>
        </Link>
      </div>
      {/* CENTER  */}
      <div className=" hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <FaHome />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <FaUserFriends />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <FaCirclePlus />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <FaSearch />
        </div>
      </div>
      {/* RIGHT  */}
      <div>
        <MobileMenu />
      </div>
      {status === "loading" && <Spinner />}
      {status === "authenticated" && (
        <Button onClick={() => signOut()}>Sign Out</Button>
      )}
    </div>
  );
};

export default Navbar;
