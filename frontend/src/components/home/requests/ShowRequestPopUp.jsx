import React from "react";
import { useSelector } from "react-redux";
import "./requests.css";
import { BiBell, BiX } from "react-icons/bi";
import { Button, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
const ShowRequestPopUp = ({ from_id, to_id, newRequest, setNewRequest }) => {
  const { allUsers } = useSelector((state) => state.user);
  const findUser = allUsers?.find((item, index) => {
    return item?._id == from_id;
  });

  return (
    <div
      style={{
        bottom: "20px",
        left: "20px",
        transition: "all 0.7s",
        transform: `${newRequest ? "translateY(0)" : "translateY(120%)"}`,
        opacity: `${newRequest ? "1" : "0"}`,
        zIndex: "333",
      }}
      className="d-flex position-fixed justify-content-center align-items-center col-lg-4 col-md-5 rounded-3 col-sm-4  bg-dark"
    >
      <div className="notification-popup rounded-3 bg-dark text-white p-4 rounded shadow-lg">
        <button className="bg-dark position-absolute end-0 top-0 border-0">
          <IconButton onClick={() => setNewRequest(false)}>
            <IoClose color="white" />
          </IconButton>
        </button>
        <div className="notification text-center">
          <h2 className="text-primary fw-lighter mb-4">New Friend Request</h2>

          <div className="notification-icon d-flex align-items-center justify-content-start mb-3 gap-2">
            <img
              src={findUser?.image ? findUser?.image : "/icons/user.png"}
              width={50}
              height={50}
              className="rounded-circle"
              alt="user image"
            />
            <h5 className="mb-0 text-capitalize">
              {findUser?.f_name} {findUser?.l_name}
            </h5>
          </div>
          <div className="button-container d-flex justify-content-end gap-3">
            <Button
              variant="contained"
              className="btn btn-outline-danger bg-danger px-3 py-2"
            >
              Reject
            </Button>
            <Button
              variant="contained"
              className="btn btn-outline-success bg-success px-3 py-2"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRequestPopUp;
