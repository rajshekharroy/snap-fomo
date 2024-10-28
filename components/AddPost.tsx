"use client";

import Image from "next/image";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/app/lib/action";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { FaImages } from "react-icons/fa";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  // const testAction = async (formData: FormData) => {
  //   "use server";
  //   const desc = formData.get("desc") as string;
  //   try {
  //     const res = await prisma.post.create({
  //       data: {
  //         userId: session?.user?.id!,
  //         desc: desc,
  //       },
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm ">
      {/* avatar */}
      {/* <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      /> */}

      {/* post */}
      <div className=" flex-1">
        {/* text input */}
        <form
          action={(formData) => addPost(formData, img?.secure_url)}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2 min-h-16"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          {/* <div className="flex justify-end">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
          </div> */}
          <AddPostButton />
        </form>
        {/* post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="FOMOFactory"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <FaImages size={30} />
                </div>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
