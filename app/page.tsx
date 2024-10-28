import { auth, signIn } from "@/auth";
import AddPost from "@/components/AddPost";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import Feed from "@/components/Feed/Feed";
import RightMenu from "@/components/RightMenu/RightMenu";
import FriendSuggestions from "@/components/RightMenu/FriendSuggestions";
import prisma from "@/prisma/client";

const HomePage = async () => {
  const session = await auth();
  console.log("session", session?.user);
  if (!session) return await signIn();
  // const datas = await prisma.user.findMany({
  //   where: {
  //     id: session?.user?.id,
  //   },
  //   include: {
  //     _count: {
  //       select: {
  //         posts: true,
  //       },
  //     },
  //   },
  // });

  // console.log(
  //   datas.map((data) => data._count),
  //   `Followers`
  // );

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <AddPost />
          <div className="m-2">
            <Feed />
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
        <FriendSuggestions />
      </div>
    </div>
  );
};

export default HomePage;
