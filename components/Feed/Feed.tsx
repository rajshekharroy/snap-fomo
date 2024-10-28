import prisma from "@/prisma/client";
import Post from "./Post";
import { auth } from "@/auth";

const Feed = async ({ email }: { email?: string }) => {
  const userId = (await auth())?.user?.id;

  let posts: any[] = [];

  if (email) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          email: email,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (!email && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);
    const ids = [userId, ...followingIds];

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return (
    <div className="rounded-lg flex flex-col gap-12">
      {posts.length
        ? posts.map((post) => (
            <div key={post.id} className=" bg-white p-4 rounded-xl">
              <Post key={post.id} post={post} />
            </div>
          ))
        : "No posts found!"}
    </div>
  );
};

export default Feed;
