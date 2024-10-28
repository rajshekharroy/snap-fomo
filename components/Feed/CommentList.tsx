"use client";

import { addComment } from "@/app/lib/action";
import { Comment, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: string;
}) => {
  const session = useSession();
  const user = session.data?.user;
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random() + "a",
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id!,
      postId: postId,
      user: {
        id: user.id!,
        image: user.image || "/noAvatar.png",
        cover: "",
        name: "",
        work: "",
        school: "",
        website: "",
        email: null,
        college: null,
        emailVerified: null,
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );
  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.image || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <button>
              <FaArrowCircleRight />
            </button>
          </form>
        </div>
      )}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* AVATAR */}
            <Image
              src={comment.user.image || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            {/* DESC */}
            <div className="flex flex-col gap-2 flex-1">
              <hr className=" border-gray-300 border-t-[0.1px]" />
              <span className="font-medium">{comment.user.name}</span>
              <p>{comment.desc}</p>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            ></Image>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
