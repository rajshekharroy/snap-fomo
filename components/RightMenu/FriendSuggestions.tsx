import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const FriendSuggestions = async () => {
  const userId = (await auth())?.user?.id;
  if (!userId) return null;
  const users = await prisma.user.findMany();
  if (users.length === 0) return null;
  const filteredUser = users.filter((user) => user.id !== userId);

  const follower = await prisma.follower.findFirst({
    where: {
      OR: [{ followerId: userId }, { followingId: userId }],
    },
  });

  if (follower) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span>Friend Suggestions</span>
        <Link href="" className=" text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {filteredUser.map((user) => (
        <div key={user.id} className="flex gap-2 items-center justify-between">
          <Image
            src={user.image!}
            width={30}
            height={30}
            alt="suggestions"
            className=" object-contain rounded-full"
          />
          <p>{user.name}</p>
          <Link href={`/profile/${user.id}`} className=" w-40">
            <Button>Profile</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FriendSuggestions;
