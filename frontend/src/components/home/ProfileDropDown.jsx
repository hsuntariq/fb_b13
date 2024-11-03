import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className="card border-0 position-absolute p-3 shadow"
      style={{
        left: "-250px",
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
        <div className="d-flex gap-2">
          <BsGear size={25} />
          <Typography variant="p" className="fw-semibold">
            Setting & privacy
          </Typography>
        </div>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <BsGear size={25} />
          <Typography variant="p" className="fw-semibold">
            Setting & privacy
          </Typography>
        </div>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <BsGear size={25} />
          <Typography variant="p" className="fw-semibold">
            Setting & privacy
          </Typography>
        </div>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <BsGear size={25} />
          <Typography variant="p" className="fw-semibold">
            Setting & privacy
          </Typography>
        </div>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <BsGear size={25} />
          <Typography variant="p" className="fw-semibold">
            Setting & privacy
          </Typography>
        </div>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>
    </div>
  );
};

export default ProfileDropDown;
