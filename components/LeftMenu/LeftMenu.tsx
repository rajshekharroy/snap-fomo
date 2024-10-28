import React from "react";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { LuActivitySquare } from "react-icons/lu";
import { MdOutlineLocalPostOffice, MdOutlineSettings } from "react-icons/md";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-2 text-gray-500">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <MdOutlineLocalPostOffice size={25} />
          <span>My Posts</span>
        </Link>
        <hr className=" border-t-2 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <LuActivitySquare size={25} />
          <span>Activity</span>
        </Link>
        <hr className=" border-t-2 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <MdOutlineSettings size={25} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftMenu;
