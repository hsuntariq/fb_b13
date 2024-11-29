import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendRequest,
  requestReset,
} from "../../../features/requests/requestSlice";
import { ThreeCircles } from "react-loader-spinner";

const UserList = ({ f_name, l_name, image, _id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    requestLoading,
    requestError,
    requestSuccess,
    requestMessage,
    requests,
  } = useSelector((state) => state.requests);
  const username = f_name + " " + l_name;

  const slicedName =
    username.length > 10 ? `${username.slice(0, 10)}... ` : username;
  // useEffect(() => {
  //   if (requestError) {
  //     toast.error(requestMessage);
  //   }

  //   dispatch(requestReset());
  // }, [requestError]);
  const handleRequest = async (id) => {
    try {
      setLoading(true);
      await dispatch(addFriendRequest(id));
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
              sx={{
                textTransform: "capitalize",
                width: "max-content",
              }}
              size="small"
              onClick={() => handleRequest(_id)}
              style={{ fontWeight: "500" }}
              variant="contained"
            >
              {loading ? (
                <ThreeCircles
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{ justifyContent: "center" }}
                  wrapperClass=""
                />
              ) : (
                " Add Friend"
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
