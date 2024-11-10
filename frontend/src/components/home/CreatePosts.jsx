import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";

const CreatePosts = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="card p-4 rounded-3 w-100 shadow bg-white my-3 border-0">
        <div className="d-flex w-100 gap-2">
          <img
            src={user?.image ? user?.image : "/icons/user.png"}
            width={40}
            height={40}
            className="rounded-full"
            alt="user image"
          />
          <CreatePostModal />
        </div>
      </div>
    </>
  );
};

export default CreatePosts;
