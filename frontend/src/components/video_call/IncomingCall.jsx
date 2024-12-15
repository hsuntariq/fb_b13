import React from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { BiSolidPhoneCall } from "react-icons/bi";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const IncomingCall = ({ sender_id, receiver_id, url, setCall }) => {
  const rejectCall = () => {
    socket.emit("reject_call", {
      rejecter_id: receiver_id,
      rejected_id: sender_id,
    });
    setCall(false);
  };

  const answerCall = () => {
    window.open(url, "_blank");
  };

  // http://localhost:3000/video-call/674c63ebb2fb45535aac2d0f/675d87ef4017c1d87ecc79e9?roomID=ybgZO
  // http://localhost:3000/video-call/674c63ebb2fb45535aac2d0f/675d87ef4017c1d87ecc79e9?roomID=JMjYL
  return (
    <>
      <div
        style={{
          top: "30px",
          transform: "translateX(-50%)",
          zIndex: "9999",
        }}
        className="d-flex justify-content-between align-items-center rounded-pill shadow-lg col-lg-3 position-fixed start-50  p-3 bg-dark"
      >
        <div className="">
          <h5 className="text-white m-0">Username</h5>
          <p className="text-secondary m-0">mail</p>
        </div>
        <div className="d-flex gap-3">
          <div
            onClick={rejectCall}
            className="p-3 d-flex justify-content-center align-items-center cursor-pointer bg-danger text-white"
            style={{ clipPath: "circle()" }}
          >
            <ImPhoneHangUp size={25} color="white" />
          </div>

          <div
            onClick={answerCall}
            className="p-3 d-flex justify-content-center align-items-center cursor-pointer bg-success text-white"
            style={{ clipPath: "circle()" }}
          >
            <BiSolidPhoneCall size={25} color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomingCall;
