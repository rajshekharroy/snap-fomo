import Image from "next/image";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";
import { auth } from "@/auth";
import prisma from "@/prisma/client";

const FriendRequests = async () => {
  const userId = (await auth())?.user?.id;

  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top  */}
      <div className="flex justify-between items-center font-medium">
        <span>Friend Requests</span>
        <Link href="" className=" text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* user */}

      <FriendRequestList requests={requests} />
    </div>
  );
};
export default FriendRequests;
