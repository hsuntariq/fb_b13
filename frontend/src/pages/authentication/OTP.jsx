import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { userReset, verifyOtpData } from "../../features/users/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const OTP = () => {
  const [otp, setOtp] = useState("");
  const { user, userError, userSuccess, userLoading, userMessage } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }
    if (userSuccess) {
      toast.success("OTP verified");
    }

    dispatch(userReset());
  }, [userError, userSuccess, dispatch]);

  const verfifyOTP = () => {
    const otpData = {
      user_id: user?._id,
      otp,
    };

    dispatch(verifyOtpData(otpData));
  };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center height-60">
        <div className="card otp  border-0 shadow p-5">
          <h5 className="display-4 text-center my-4">Verify Email</h5>
          <OtpInput
            inputType="tel"
            inputStyle={{
              padding: "1.6rem",
              width: "70px",
              margin: "0 1rem",
              border: "1px groove lightgray",
              borderRadius: "5px",
            }}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <div className="d-flex gap-3 justify-content-end my-4">
            <Button variant="contained" className="bg-danger rounded-pill">
              Clear
            </Button>
            <Button
              onClick={verfifyOTP}
              variant="contained"
              className="bg-success rounded-pill"
            >
              verify OTP
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OTP;
