"use client";

import { deletePost } from "@/app/lib/action";
import Image from "next/image";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";

const PostInfo = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer"
      >
        <IoIosMore />
      </button>

      {open && (
        <div className="absolute top-4 right-0 bg-white p-2 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
