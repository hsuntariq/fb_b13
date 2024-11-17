import React, { useState } from "react";
import { sidebarData } from "../../data/SidebarData";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const username = user?.f_name + " " + user?.l_name;
  const [number, setNumber] = useState(8);
  return (
    <>
      <div className="height-100 position-sticky" style={{ top: "50px" }}>
        <ul className="list-unstyled d-flex flex-column gap-1">
          <li className="d-flex p-2 px-4 rounded-2 sidebar-list gap-3 align-items-center">
            <img
              src={`${user?.image ? user?.image : "/icons/user.png"}`}
              width={30}
              alt=""
            />
            <Typography variant="p" className="fw-semibold">
              {username?.length > 10
                ? username.slice(0, 10) + "..."
                : user?.l_name}
            </Typography>
          </li>
          {sidebarData?.slice(0, number)?.map((item, index) => {
            return (
              <li
                key={item?.id}
                className="d-flex p-2 px-4 rounded-2 sidebar-list gap-3 align-items-center"
              >
                <div className="icon-image">
                  <img width={30} src={item?.image} alt="" />
                </div>
                <div className="text">
                  <Typography variant="p" className="fw-semibold">
                    {item?.title}
                  </Typography>
                </div>
              </li>
            );
          })}
          <span
            onClick={
              number == 8
                ? () => setNumber(sidebarData?.length)
                : () => setNumber(8)
            }
            className="p-2 rounded-full cursor-pointer d-flex justify-content-center  bg-gray"
          >
            {number == 8 ? (
              <>
                <RiArrowDropDownLine size={30} />
              </>
            ) : (
              <>
                <RiArrowDropUpLine size={30} />
              </>
            )}
          </span>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
