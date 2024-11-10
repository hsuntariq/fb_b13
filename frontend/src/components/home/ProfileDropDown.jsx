import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { BsGear, BsGearFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoHelpCircle } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";

const ProfileDropDown = ({ setShowPopUp }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div
        onClick={() => setShowPopUp(false)}
        className="underlay position-fixed top-0 start-0"
        style={{
          height: "100vh",
          zIndex: "2",
          width: "100vw",
        }}
      ></div>
      <div
        className="card border-0 position-absolute p-3 shadow"
        style={{
          left: "-320px",
          width: "350px",
          zIndex: "3",
        }}
      >
        <div className="card shadow p-3 border-0 rounded-2">
          <div className="d-flex gap-3 align-items-center">
            {user?.image ? (
              <>
                <img
                  src={user?.image}
                  alt="user image"
                  width={25}
                  className="rounded-full"
                />
                <Typography variant="p" className="text-sm fw-semibold">
                  {user?.f_name} {user?.l_name}
                </Typography>
              </>
            ) : (
              <>
                <FaUser size={20} />
                <Typography variant="p" className="text-sm fw-semibold">
                  {user?.f_name} {user?.l_name}
                </Typography>
              </>
            )}
          </div>
        </div>
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <BsGearFill size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Setting & privacy
            </Typography>
          </div>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <IoHelpCircle size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Help & Support
            </Typography>
          </div>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <FaMoon size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Display & accessibility
            </Typography>
          </div>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <MdFeedback size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Give Feedback
            </Typography>
          </div>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <GiEntryDoor size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Logout
            </Typography>
          </div>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
      </div>
    </>
  );
};

export default ProfileDropDown;
