import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";

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
    </>
  );
};

export default Home;
