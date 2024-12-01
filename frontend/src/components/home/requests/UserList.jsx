import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendRequest,
  requestReset,
} from "../../../features/requests/requestSlice";
import { ThreeCircles } from "react-loader-spinner";

import io from "socket.io-client";
import ShowRequestPopUp from "./ShowRequestPopUp";

const socket = io.connect("http://localhost:3001");

const UserList = ({ f_name, l_name, image, _id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [btnState, setBtnState] = useState({
    text: "Add Friend",
    disabled: false,
  });
  const [loading, setLoading] = useState(false);
  const {
    requestLoading,
    requestError,
    requestSuccess,
    requestMessage,
    requests,
  } = useSelector((state) => state.requests);
  const username = f_name + " " + l_name;

  const btnRef = useRef();

  const slicedName =
    username.length > 10 ? `${username.slice(0, 10)}... ` : username;

  const handleRequest = async (id) => {
    try {
      setLoading(true);
      socket.emit("add_friend", { from_id: user?._id, to_id: id });
      // await dispatch(addFriendRequest(id));
      // setBtnState({ text: "Requested", disabled: true });
    } catch (error) {
      toast.error("Request already sent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex rounded-3 new-request p-3 gap-2 align-items-center">
        <div className="user-image">
          <img
            src={image ? image : "/icons/user.png"}
            alt="user image"
            width={60}
            height={60}
            className="rounded-circle"
          />
        </div>
        <div className="user-request">
          <div className="d-flex  justify-content-between text-capitalize align-items-center">
            <Typography variant="p" className="text-md fw-semibold">
              {slicedName}
            </Typography>
          </div>
          <div className="d-flex gap-2">
            <Button
              ref={btnRef}
              disabled={btnState.disabled}
              sx={{ textTransform: "capitalize", width: "max-content" }}
              size="small"
              onClick={() => handleRequest(_id)}
              style={{
                background: btnState.disabled ? "#D6D9DD" : "#1976D2",
                fontWeight: "500",
              }}
              variant="contained"
            >
              {loading ? (
                <>
                  <ThreeCircles
                    visible={true}
                    height="25"
                    width="25"
                    color="white"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{ justifyContent: "center" }}
                    wrapperClass=""
                  />
                </>
              ) : (
                <>{btnState.text}</>
              )}
            </Button>

            <Button
              sx={{
                textTransform: "capitalize",
                width: "max-content",
              }}
              size="small"
              variant="contained"
              style={{
                background: "#D6D9DD",
                color: "black",
                fontWeight: "500",
              }}
            >
              Hide
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
