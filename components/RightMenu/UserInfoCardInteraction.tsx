"use client";

import { switchBlock, switchFollow } from "@/app/lib/action";
import { Button } from "@radix-ui/themes";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {}
  };
  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "block" | "follow") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  return (
    <>
      <div>
        <form action={follow}>
          <Button disabled={optimisticState.blocked}>
            {optimisticState.following
              ? "Following"
              : optimisticState.followingRequestSent
              ? "Friend Request Sent"
              : "Follow"}
          </Button>
        </form>
        <form action={block}>
          <Button>
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserInfoCardInteraction;
