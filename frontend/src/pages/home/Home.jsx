import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/home/Sidebar";
import Posts from "../../components/home/Posts";
import Users from "../../components/home/Users";
import ShowRequestPopUp from "../../components/home/requests/ShowRequestPopUp";
import ChatPopUp from "../../components/home/chat/ChatPopUp";

import io from "socket.io-client";
import IncomingCall from "../../components/video_call/IncomingCall";
import { userReset } from "../../features/users/userSlice";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [call, setCall] = useState(false);
  const [userData, setUserData] = useState({});
  const { user, userSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(userReset());
  }, []);

  useEffect(() => {
    document.title = `Welcome ${user?.f_name}`;
  }, []);

  useEffect(() => {
    socket.on("show-video", (data) => {
      if (data?.receiver_id == user?._id) {
        setCall(true);
        setUserData(data);
      }
    });
  });

  useEffect(() => {
    socket.on("call_rejected", (data) => {
      if (data.rejected_id == user?._id) {
        alert("Call declined");
      }
    });
  });

  return (
    <>
      {call && <IncomingCall {...userData} setCall={setCall} />}
      <Header />

      <Row>
        <Col xl={2} lg={2} md={0} className="d-none d-lg-block">
          <Sidebar />
        </Col>
        <Col xl={8} lg={8} md={9} className="p-md-5 p-sm-2 p-xl-0 p-lg-0 p-4">
          <Posts />
        </Col>
        <Col xl={2} lg={3} md={3}>
          <Users />
        </Col>
      </Row>
    </>
  );
};

export default Home;
