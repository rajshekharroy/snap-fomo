import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top  */}
      <div className="flex justify-between items-center font-medium">
        <span>User Media</span>
        <Link href="" className=" text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* bottom  */}
      <div className=" flex gap-4 flex-wrap">
        {postWithMedia.length
          ? postWithMedia.map((post) => (
              <div className=" relative w-1/5 h-24" key={post.id}>
                <Image
                  src={post.img!}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No media found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
