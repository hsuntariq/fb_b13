import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdLock } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { BiChat, BiLogoWhatsapp } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { GoThumbsup } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";
import PostPopOver from "./PostPopOver";

const MyPosts = ({ createdAt, visibility, content, caption }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="card my-2  border-0 shadow">
        <div className="d-flex p-4 pb-1 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <img
              src={user.image ? user.image : "/icons/user.png"}
              width={40}
              height={40}
              className="rounded-circle"
              alt="User image"
            />
            <div className="d-flex flex-column ">
              <Typography variant="h6" className="text-md m-0 fw-semibold">
                {user?.f_name} {user?.l_name}
              </Typography>
              <div className="d-flex align-items-center ">
                <Typography variant="p" className="text-sm m-0 text-secondary">
                  {moment(createdAt).format("lll")}
                </Typography>
                <BsDot className="text-secondary" />
                {visibility == "public" && (
                  <FaGlobeAmericas size={12} className="text-secondary" />
                )}
                {visibility == "friends" && (
                  <PiUsersThreeFill size={12} className="text-secondary" />
                )}
                {visibility == "only_me" && (
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
              className=" rounded-full p-1 d-flex justify-content-center align-items-center"
              style={{ background: "#039BFD", zIndex: "3" }}
            >
              <FaThumbsUp size={12} color="white" />
            </div>
            <div
              style={{
                background: "#F92D3D",
                marginLeft: "-0.3rem",
                // zIndex: "-1",
              }}
              className=" rounded-full p-1 d-flex justify-content-center  align-items-center"
            >
              <GoHeartFill size={12} color="white" />
            </div>
            <Typography className="text-md ms-1  fw-semibold text-secondary">
              23
            </Typography>
          </div>
          <div className="d-flex gap-2 align-items-center ">
            <Typography className="text-secondary">2 comments</Typography>
            <Typography className="text-secondary">1 share</Typography>
          </div>
        </div>
        <div className="px-4">
          <hr className="m-0" />
        </div>
        <div className="d-flex p-3 justify-content-between">
          <div className="d-flex w-100 justify-content-center gap-2 align-items-center">
            <GoThumbsup size={20} />
            <Typography className="text-md  text-secondary">Like</Typography>
          </div>
          <div className="d-flex w-100 justify-content-center gap-2 align-items-center">
            <IoChatbubbleOutline size={20} />
            <Typography className="text-md  text-secondary">Comment</Typography>
          </div>
          <div className="d-flex w-100 justify-content-center gap-2 align-items-center">
            <BiLogoWhatsapp size={20} />
            <Typography className="text-md  text-secondary">Send</Typography>
          </div>
          <div className="d-flex w-100 justify-content-center gap-2 align-items-center">
            <PiShareFat size={20} />
            <Typography className="text-md  text-secondary">Share</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPosts;
