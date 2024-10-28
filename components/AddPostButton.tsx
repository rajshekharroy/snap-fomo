"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  return (
    <button
      onClick={() => router.refresh()}
      className="bg-blue-500 p-2 mt-2 h-fit rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          Sending
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
