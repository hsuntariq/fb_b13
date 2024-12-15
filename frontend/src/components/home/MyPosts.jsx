import { IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdLock } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { BiLogoWhatsapp } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { GoThumbsup } from "react-icons/go";
import { IoChatbubbleOutline, IoSend } from "react-icons/io5";
import PostPopOver from "./PostPopOver";
import PostComments from "./PostComments";
import { addCommentData } from "../../features/posts/postSlice";

const MyPosts = ({
  _id,
  createdAt,
  visibility,
  content,
  caption,
  comments,
}) => {
  const { user = {} } = useSelector((state) => state.user); // Default empty object
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const { commentLoading } = useSelector((state) => state.posts);
  const [tempComment, setTempComments] = useState(comments);
  const dispatch = useDispatch();
  const addMyComment = () => {
    const postData = {
      comment,
      post_id: _id,
    };

    dispatch(addCommentData(postData));
  };
  return (
    <>
      <div className="card my-2 border-0 shadow">
        <div className="d-flex p-4 pb-1 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <img
              src={user?.image ? user?.image : "/icons/user.png"}
              width={40}
              height={40}
              className="rounded-circle"
              alt="User image"
            />
            <div className="d-flex flex-column">
              <Typography variant="h6" className="text-md m-0 fw-semibold">
                {user?.f_name} {user?.l_name}
              </Typography>
              <div className="d-flex align-items-center">
                <Typography variant="p" className="text-sm m-0 text-secondary">
                  {moment(createdAt).format("lll")}
                </Typography>
                <BsDot className="text-secondary" />
                {visibility === "public" && (
                  <FaGlobeAmericas size={12} className="text-secondary" />
                )}
                {visibility === "friends" && (
                  <PiUsersThreeFill size={12} className="text-secondary" />
                )}
                {visibility === "only_me" && (
                  <IoMdLock size={12} className="text-secondary" />
                )}
              </div>
            </div>
          </div>
          <PostPopOver />
        </div>
        <div className="caption pb-3 pt-1 px-3">
          <Typography className="text">{caption}</Typography>
        </div>
        <div className="post-image">
          <img
            src={content}
            width={"100%"}
            className="object-cover"
            height={400}
            alt="post image"
          />
        </div>
        <div className="d-flex p-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="rounded-full p-1 d-flex justify-content-center align-items-center"
              style={{ background: "#039BFD", zIndex: "3" }}
            >
              <FaThumbsUp size={12} color="white" />
            </div>
            <div
              style={{
                background: "#F92D3D",
                marginLeft: "-0.3rem",
              }}
              className="rounded-full p-1 d-flex justify-content-center align-items-center"
            >
              <GoHeartFill size={12} color="white" />
            </div>
            <Typography className="text-md ms-1 fw-semibold text-secondary">
              23
            </Typography>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <Typography className="text-secondary">
              {comments?.length} comments
            </Typography>
            <Typography className="text-secondary">1 share</Typography>
          </div>
        </div>
        <div className="px-4">
          <hr className="m-0" />
        </div>
        <div className="d-flex pt-3 justify-content-between">
          <div className="d-flex cursor-pointer w-100 justify-content-center gap-2 align-items-center">
            <GoThumbsup size={20} />
            <Typography className="text-md text-secondary">Like</Typography>
          </div>

          <PostComments
            showInput={showInput}
            setShowInput={setShowInput}
            comments={comments?.length}
          />
          <div className="d-flex cursor-pointer w-100 justify-content-center gap-2 align-items-center">
            <BiLogoWhatsapp size={20} />
            <Typography className="text-md text-secondary">Send</Typography>
          </div>
          <div className="d-flex cursor-pointer w-100 justify-content-center gap-2 align-items-center">
            <PiShareFat size={20} />
            <Typography className="text-md text-secondary">Share</Typography>
          </div>
        </div>
        <div
          className="px-3 py-2"
          style={{
            display: `${showInput ? "block" : "none"}`,
            visibility: `${showInput ? "visible" : "hidden"}`,
            opacity: `${showInput ? "1" : "0"}`,
            transition: "all 0.1s",
            zIndex: "0",
          }}
        >
          <hr className="m-1" />

          {comments?.map((item, index) => {
            return (
              <>
                <div className="d-flex my-2 align-items-center" key={index}>
                  <img
                    src={user?.image ? user?.image : "/icons/user.png"}
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div className="bg-light px-2 py-1">
                    <h6 className="m-0">
                      {user?.f_name} {user?.l_name}
                    </h6>
                    <p className="text-secondary">{item.comment}</p>
                  </div>
                </div>
              </>
            );
          })}

          <div className="d-flex gap-2 align-items-center">
            <img
              src={user?._image ? user?.image : "/icons/user.png"}
              width={30}
              height={30}
              className="rounded-circle"
              alt="user image"
            />
            <div
              style={{ background: "#F0F2F5" }}
              className="d-flex p-1 form-control rounded-pill"
            >
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-100 border-0 outline-0 bg-transparent"
                placeholder="Write a comment..."
              />
              <IconButton
                onClick={addMyComment}
                sx={{ width: "30px", height: "30px" }}
              >
                <IoSend />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPosts;
