"use client";

import { updateProfile } from "@/app/lib/action";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";
import { RxCrossCircled } from "react-icons/rx";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover.secure_url })
            }
            className="p-12 bg-white opacity-100 rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the profile picture or username
            </div>
            {/* <div className=" flex flex-col gap-4 my-4">
              <label htmlFor="">Cover Picture</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <UploadImageWidget setCover={setCover} buttonText="Change" />
              </div>
            </div> */}

            <CldUploadWidget
              uploadPreset="FOMOFactory"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className=" flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className=" text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Name
                </label>
                <input
                  className=" ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="name"
                  id=""
                  placeholder={user.name || "Your Name"}
                />
              </div>
            </div>

            {/* <button className="bg-blue-500 p-2 mt-2 rounded-md text-white">Update</button> */}
            <UpdateButton />
            {state.success && (
              <span className="text-green-500">Profile has been updated</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong</span>
            )}
            <div
              className="absolute top-3 right-2 cursor-pointer text-xl "
              onClick={handleClose}
            >
              <RxCrossCircled />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
