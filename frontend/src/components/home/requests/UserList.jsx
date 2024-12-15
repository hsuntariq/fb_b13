import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import io from "socket.io-client";
import ChatPopUp from "../chat/ChatPopUp";

const socket = io.connect("http://localhost:3001");

const UserList = ({
  f_name,
  l_name,
  image,
  _id,
  activePopupId,
  setActivePopupId,
  sentMessages,
  setSentMessages,
  receivedMessages,
  setReceivedMessages,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [btnState, setBtnState] = useState({
    text: "Add Friend",
    disabled: false,
  });
  const [loading, setLoading] = useState(false);
  const username = f_name + " " + l_name;

  const [showMessenger, setShowMessenger] = useState(false);
  const [message, setMessage] = useState("");

  const btnRef = useRef();

  const slicedName =
    username.length > 10 ? `${username.slice(0, 10)}... ` : username;

  const handleRequest = async (id) => {
    try {
      setLoading(true);
      socket.emit("add_friend", { from_id: user?._id, to_id: id });
      // Dispatch your friend request logic here
      setBtnState({ text: "Requested", disabled: true });
    } catch (error) {
      toast.error("Request already sent");
    } finally {
      setLoading(false);
    }
  };

  const isPopupOpen = activePopupId === _id; // Check if this user's popup should be open

  const [userID, setUserID] = useState(null);

  const sendMessage = () => {
    socket.emit("sent_message", {
      message,
      from_id: user?._id,
      to_id: _id,
      sent: true,
      time: Date.now(),
    });

    setSentMessages([
      ...sentMessages,
      { message, from_id: user?._id, to_id: _id, sent: true, time: Date.now() },
    ]);
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setReceivedMessages([
        ...receivedMessages,
        {
          message: data.message,
          sent: false,
          from_id: data.from_id,
          to_id: data.to_id,
          time: data.time,
        },
      ]);
    });
  });

  const allMessages = [...receivedMessages, ...sentMessages].sort((a, b) => {
    return a.time - b.time;
  });

  return (
    <>
      {isPopupOpen && (
        <ChatPopUp
          allMessages={allMessages}
          sendMessage={sendMessage}
          userID={userID}
          message={message}
          setMessage={setMessage}
          closePopUp={() => setActivePopupId(null)} // Close popup when required
        />
      )}

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
          <div className="d-flex justify-content-between text-capitalize align-items-center">
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
                <ThreeCircles
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{ justifyContent: "center" }}
                />
              ) : (
                btnState.text
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
              onClick={() => {
                setActivePopupId(isPopupOpen ? null : _id);
                setUserID(_id);
              }} // Toggle the popup
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
