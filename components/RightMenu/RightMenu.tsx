import { User } from "@prisma/client";
import UserInfoCard from "./UserInfoCard";
import { Suspense } from "react";
import UserMediaCard from "./UserMediaCard";
import FriendRequests from "./FriendRequests";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      {/* <BirthDays/>
      <Ad size='md'/> */}
    </div>
  );
};

export default RightMenu;
