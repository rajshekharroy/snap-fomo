import noCover from "@/app/assets/noCover.webp";
import { auth } from "@/auth";
import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import prisma from "@/prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaPlusSquare } from "react-icons/fa";

interface Profile {
  params: { id: string };
}

const Profile = async ({ params }: Profile) => {
  const { id } = await params;
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      followers: {
        select: {
          followerId: true,
        },
      },
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });
  console.log(user?.followers, "hi");

  if (!user) return notFound();

  const session = await auth();
  if (!session) return null;
  const currentUserId = session.user?.id;
  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className=" flex gap-6 pt-6 min-h-screen">
      <div className=" hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className=" w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              {/* {currentUserId === id && !user.cover && (
                  <button className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center gap-2 bg-slate-500 text-white px-4 py-[5px] rounded-3xl font-medium text-lg">
                    Add a Cover
                    <FaPlusSquare />
                  </button>
                )} */}

              <Image
                src={user.cover || noCover}
                fill
                alt=""
                className={` rounded-md object-cover ${
                  !user.cover && `border-8 border-black`
                } border-opacity-10`}
              />

              <Image
                src={user.image!}
                width={128}
                height={128}
                alt=""
                className=" h-32 w-32 object-cover rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
              />
            </div>
            <h1 className=" mt-20 mb-4 text-2xl font-medium">{user.name}</h1>

            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className=" font-medium">{user._count.posts}</span>
                <span className=" text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className=" font-medium">{user._count.followings}</span>
                <span className=" text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className=" font-medium">{user._count.followers}</span>
                <span className=" text-sm">Following</span>
              </div>
            </div>
          </div>
          {user.email && <Feed email={user.email} />}
          {/* {id === user.foll<p className=" border-red-700 border-4 text-4xl p-4">hiii</p>} */}
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default Profile;
