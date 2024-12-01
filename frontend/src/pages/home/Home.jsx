import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/home/Sidebar";
import Posts from "../../components/home/Posts";
import Users from "../../components/home/Users";
import ShowRequestPopUp from "../../components/home/requests/ShowRequestPopUp";
const Home = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user?.otp !== null) {
  //     navigate("/otp");
  //   }
  // }, []);

  return (
    <>
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
