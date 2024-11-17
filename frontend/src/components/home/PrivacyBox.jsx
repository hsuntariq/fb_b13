import { Typography } from "@mui/material";
import React from "react";
import { BiGroup, BiLock } from "react-icons/bi";
import { FaGlobeAmericas, FaLock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdGroup } from "react-icons/md";

const PrivacyBox = ({
  showPrivacyBox,
  setShowPrivacyBox,
  visibility,
  setVisibility,
}) => {
  return (
    <>
      <div
        style={{
          transform: `${showPrivacyBox ? "translateX(0)" : "translateX(100%)"}`,
          opacity: `${showPrivacyBox ? "1" : "0"}`,
        }}
        className="position-absolute transition-lg h-100 p-4 card w-100 border-0 top-0 shadow-lg end-0"
      >
        <div className="d-flex align-items-center">
          <div
            onClick={() => setShowPrivacyBox(false)}
            className="p-2 cursor-pointer rounded-full d-flex justify-content-center align-items-center bg-gray position-absolute"
          >
            <IoMdArrowBack />
          </div>
          <Typography className="fw-semibold w-100 text-center">
            Post audience
          </Typography>
        </div>
        <hr />
        <Typography className="fw-semibold text-md">
          Who can see your post?
        </Typography>
        <Typography className="text-secondary text-md">
          Your post will appear in Feed, on your profile and in search results.
        </Typography>
        <Typography className="text-secondary text-md my-3">
          Your default audience is set to Friends, but you can change the
          audience of this specific post.{" "}
        </Typography>
        <div className="d-flex my-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center text-md">
            <div className="p-3 rounded-full d-flex justify-content-center align-items-center bg-gray ">
              <FaGlobeAmericas size={25} />
            </div>
            <div className="">
              <Typography variant="h6" className="fw-semibold text-md">
                Public
              </Typography>
              <Typography className="text-secondary text-md">
                Anyone on or off Apnibook
              </Typography>
            </div>
          </div>
          <input
            onChange={(e) => setVisibility(e.target.value)}
            type="radio"
            value="public"
            className="form-check type-radio"
            name="type"
          />
        </div>
        <div className="d-flex my-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center text-md">
            <div className="p-3 rounded-full d-flex justify-content-center align-items-center bg-gray ">
              <MdGroup size={25} />
            </div>
            <div className="">
              <Typography variant="h6" className="fw-semibold text-md">
                Friends
              </Typography>
              <Typography className="text-secondary text-md">
                Your Friends on Apnibook
              </Typography>
            </div>
          </div>
          <input
            onChange={(e) => setVisibility(e.target.value)}
            type="radio"
            value="friends"
            className="form-check type-radio"
            name="type"
          />
        </div>
        <div className="d-flex my-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center text-md">
            <div className="p-3 rounded-full d-flex justify-content-center align-items-center bg-gray ">
              <FaLock size={25} />
            </div>
            <div className="">
              <Typography variant="h6" className="fw-semibold text-md">
                Only me
              </Typography>
            </div>
          </div>
          <input
            onChange={(e) => setVisibility(e.target.value)}
            type="radio"
            value="only_me"
            className="form-check type-radio"
            name="type"
          />
        </div>
      </div>
    </>
  );
};

export default PrivacyBox;
