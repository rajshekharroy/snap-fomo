import { auth } from "@/auth";
import prisma from "@/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const ProfileCard = async () => {
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followings: true,
        },
      },
    },
  });

  if (!user) return notFound();

  return (
    <div className=" p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user.image!}
          alt=""
          fill
          className=" rounded-md object-contain"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className=" font-semibold">{user.name}</span>
        <div className=" flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              height={12}
              width={12}
              className=" rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              height={12}
              width={12}
              className=" rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              height={12}
              width={12}
              className=" rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className=" text-xs text-gray-500">
            {user._count.followings} Followers
          </span>
        </div>
        <Link href={`/profile/${user.id}`}>
          <button className=" bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
