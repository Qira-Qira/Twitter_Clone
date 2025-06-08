import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
  const modalRef = useRef(null);

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  if (suggestedUsers?.length === 0) return null;

  return (
    <>
      {/* Mobile: Only show button */}
      <div className="block lg:hidden w-full px-2 mt-4">
        <button
          className="btn btn-primary text-white w-full rounded-full"
          onClick={() => modalRef.current.showModal()}
        >
          Who to follow
        </button>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box bg-[#16181C] p-4 rounded-md w-80 max-w-full">
            <h3 className="font-bold mb-4">Who to follow</h3>
            <div className="flex flex-col gap-4">
              {isLoading && (
                <>
                  <RightPanelSkeleton />
                  <RightPanelSkeleton />
                  <RightPanelSkeleton />
                </>
              )}
              {!isLoading &&
                suggestedUsers?.map((user) => (
                  <Link
                    to={`/profile/${user.username}`}
                    className="flex items-center justify-between gap-4"
                    key={user._id}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={user.profileImg || "/avatar-placeholder.png"} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold tracking-tight truncate w-28">
                          {user.fullName}
                        </span>
                        <span className="text-sm text-slate-500">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          follow(user._id);
                        }}
                      >
                        {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                      </button>
                    </div>
                  </Link>
                ))}
            </div>
            <form method="dialog" className="mt-4">
              <button className="btn btn-sm btn-block">Close</button>
            </form>
          </div>
        </dialog>
      </div>

      {/* Desktop: Show panel as usual */}
      <div className="hidden lg:block w-full px-2 mt-4 lg:mt-0 lg:w-72 lg:mx-2 lg:my-4 lg:sticky lg:top-2">
        <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
          <p className="font-bold">Who to follow</p>
          <div className="flex flex-col gap-4">
            {isLoading && (
              <>
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
              </>
            )}
            {!isLoading &&
              suggestedUsers?.map((user) => (
                <Link
                  to={`/profile/${user.username}`}
                  className="flex items-center justify-between gap-4"
                  key={user._id}
                >
                  <div className="flex gap-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={user.profileImg || "/avatar-placeholder.png"} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight truncate w-28">
                        {user.fullName}
                      </span>
                      <span className="text-sm text-slate-500">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        follow(user._id);
                      }}
                    >
                      {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                    </button>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightPanel;