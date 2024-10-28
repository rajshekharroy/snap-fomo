"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/app/lib/action";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);
  const router = useRouter();

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
      router.refresh();
    } catch (error) {
      console.log("Error form frn rqst lst", error);
    }
  };
  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log("Error form frn rqst lst", error);
    }
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  return (
    <div>
      {optimisticRequest.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.image || "/noAvatar.png"}
              height={40}
              width={40}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{request.sender.name}</span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.senderId)}>
              <button className=" bg-green-600 rounded-full">
                <TiTick color="white" size={25} />
              </button>
            </form>
            <form action={() => decline(request.id, request.senderId)}>
              <button className=" bg-red-500 rounded-full">
                <RxCross2 color="white" size={25} />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
