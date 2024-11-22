import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersData, userReset } from "../../../features/users/userSlice";

const NewRequests = () => {
  const { userLoading, userError, userSuccess, userMessages, allUsers } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userError) {
      toast.error(userMessages);
    }

    dispatch(getAllUsersData());

    dispatch(userReset());
  }, []);
  return (
    <>
      <div className="d-flex p-3 w-100  align-items-center justify-content-between">
        <Typography
          variant="h6"
          className="m-0 text-secondary fw-semibold"
          style={{ fontSize: "1rem" }}
        >
          Friend requests
        </Typography>
        <Typography style={{ fontSize: "1rem" }} class="text-primary m-0">
          See All
        </Typography>
      </div>
      <div className="d-flex rounded-3 new-request p-3 gap-2 align-items-center">
        <div className="user-image">
          <img
            src="https://scontent.fisb9-1.fna.fbcdn.net/v/t39.30808-1/310591983_5266388726821739_8709439959365820772_n.jpg?stp=cp0_dst-jpg_s60x60&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=fFoEfxD_A5AQ7kNvgFFl-Xl&_nc_zt=24&_nc_ht=scontent.fisb9-1.fna&_nc_gid=AszSttUHT-ZYY5HHpCRYV3B&oh=00_AYC0X8N6IIYYx2Grd8D0Jv7Q_BTRlc-R2_o6gb5wwuzUzA&oe=674647F6"
            alt="user image"
            width={60}
            height={60}
            className="rounded-circle"
          />
        </div>
        <div className="user-request">
          <div className="d-flex  justify-content-between align-items-center">
            <Typography variant="h6" className="text-md ">
              User name
            </Typography>
            <Typography variant="h6" className="text-md text-primary time">
              6m
            </Typography>
          </div>
          <div className="d-flex gap-2">
            <Button style={{ fontWeight: "500" }} variant="contained">
              Confirm
            </Button>
            <Button
              variant="contained"
              style={{
                background: "#D6D9DD",
                color: "black",
                fontWeight: "500",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <hr />
      {allUsers?.map((item, index) => {
        return <UserList key={index} {...item} />;
      })}
    </>
  );
};

export default NewRequests;