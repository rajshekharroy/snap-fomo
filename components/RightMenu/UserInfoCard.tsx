import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import Image from "next/image";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";
import Link from "next/link";
import { FaSchool } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { LuSchool } from "react-icons/lu";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const session = await auth();
  const currentUserId = session?.user?.id;

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top  */}
      <div className="flex justify-between items-center font-medium">
        <span>User Information.</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="" className=" text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>
      {/* bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black"></span>
          <span className="text-sm">@{user.email}</span>
        </div>
        {<p>{user.name}</p>}
        {user.email && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" height={16} width={16} />
            <span>
              Living in <b>{user.email}</b>
            </span>
          </div>
        )}
        {user.email && (
          <div className="flex items-center gap-2">
            <LuSchool />
            <span>
              Went to <b>{user.email}</b>
            </span>
          </div>
        )}

        <div className="flex gap-1 items-center">
          <MdOutlineDateRange />
          <span>Joined {formattedDate}</span>
        </div>
      </div>
      {currentUserId && currentUserId !== user.id && (
        <UserInfoCardInteraction
          userId={user.id}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
      )}
    </div>
  );
};

export default UserInfoCard;
