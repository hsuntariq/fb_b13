import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BsFillTelephoneFill,
  BsFillCameraVideoFill,
  BsFillEmojiSunglassesFill,
} from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiCamera, BiMicrochip, BiSolidFileImage } from "react-icons/bi";
import { IoClose, IoCloseCircle, IoSend } from "react-icons/io5";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatPopUp = ({
  sendMessage,
  message,
  setMessage,
  closePopUp,
  userID,
  allMessages,
}) => {
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(true);

  const { allUsers, user } = useSelector((state) => state.user);

  const myUser = allUsers?.find((item, index) => {
    return item?._id == userID;
  });

  useEffect(() => {
    if (message.length > 0) {
      setShowIcons(false);
    } else {
      setShowIcons(true);
    }
  }, [message]);

  const filteredMessages = () => {
    const myMessages = allMessages?.filter((item) => {
      return (
        (item?.to_id == user._id && item?.from_id == userID) || // messages sent to the current user
        (item?.from_id == user._id && item?.to_id == userID) // messages sent by the current user
      );
    });

    return myMessages;
  };

  useEffect(() => {
    filteredMessages();
    console.log(filteredMessages());
  }, [userID]);

  const handleVideoCall = () => {
    window.open(
      `http://localhost:3000/video-call/${user?._id}/${userID}`,
      "_blank"
    );
  };

  return (
    <div
      className="col-sm-5 col-md-4 col-lg-4 col-xl-3 shadow-lg position-fixed bg-white z-3 mt-5"
      style={{ bottom: "0", right: "10%" }}
    >
      <div className="border rounded">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-bottom">
          <div className="d-flex align-items-center">
            <img
              src="/icons/user.png"
              width={40}
              height={40}
              className="rounded-circle mx-auto d-block"
              alt="user image"
            />
            <h6 className="mb-0 ms-2">
              {myUser?.f_name} {myUser?.l_name}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <BsFillTelephoneFill color="#841DFF" className="me-3" />
            <BsFillCameraVideoFill
              cursor={"pointer"}
              onClick={handleVideoCall}
              color="#841DFF"
              className="me-3"
            />
            <AiFillInfoCircle color="#841DFF" />
            <IoCloseCircle
              onClick={closePopUp}
              color="#841DFF"
              className="ms-2"
            />
          </div>
        </div>

        {/* image section */}

        {/* Chat Section */}
        <div
          className="p-3"
          style={{
            height: "300px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img
              src="/icons/user.png"
              width={70}
              height={70}
              className="rounded-circle mx-auto d-block"
              alt="user image"
            />
            <Typography>User Name</Typography>
          </div>

          <div className="text-center small text-secondary mb-2">
            You are now connected on Messenger
          </div>
          {/* Messages */}
          <div className="d-flex flex-column">
            {filteredMessages()?.map((item, index) => {
              return (
                <>
                  {item?.sent ? (
                    <>
                      <div
                        className="bg-success ms-auto p-2 my-2 text-white"
                        style={{ maxWidth: "100px" }}
                      >
                        {item?.message}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="bg-secondary me-auto p-2 my-2 text-white"
                        style={{ maxWidth: "100px" }}
                      >
                        {item?.message}
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>

        {/* Input Section */}
        <div className="border-top d-flex align-items-center p-2 bg-white">
          <div
            className="emojis d-flex"
            style={{
              transition: "all 0.3s",
              opacity: `${showIcons ? "1" : "0"}`,
              width: `${showIcons ? "120px" : "0"}`,
            }}
          >
            <button className="bg-transparent border-0 btn-light ">
              <BsFillEmojiSunglassesFill color="#0079F2" />
              {/* <i className="bi bi-emoji-smile"></i> */}
            </button>
            <button className="bg-transparent border-0 btn-light ">
              {/* <i className="bi bi-camera"></i> */}
              <BiCamera color="#0079F2" />
            </button>
            <button className="bg-transparent border-0 btn-light ">
              {/* <i className="bi bi-file-earmark"></i> */}
              <BiSolidFileImage color="#0079F2" />
            </button>
            <button className="bg-transparent border-0 btn-light ">
              {/* <i className="bi bi-mic"></i> */}
              <BiMicrochip color="#0079F2" />
            </button>
          </div>
          <input
            style={{ boxShadow: "none" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="form-control p-1 px-3 rounded-pill flex-grow-1"
            placeholder="Aa"
          />
          <button
            onClick={sendMessage}
            disabled={showIcons}
            className="bg-transparent border-0 btn-light "
          >
            {/* <i className="bi bi-camera"></i> */}
            <IoSend color={`${message.length > 0 ? "#0079F2" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopUp;
