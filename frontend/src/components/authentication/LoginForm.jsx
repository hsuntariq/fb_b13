import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUserData, userReset } from "../../features/users/userSlice";
import { toast } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
const LoginForm = () => {
  // state to check the status of eye
  const [showEye, setShowEye] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { user, userLoading, userError, userSuccess, userMessage } =
    useSelector((state) => state.user);
  const [formFields, setFormFields] = useState({
    m_mail: "",
    password: "",
  });

  //   destructure
  const { m_mail, password } = formFields;

  //   handle the change

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (password.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [password]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    dispatch(userReset());
  }, [userError, userSuccess, dispatch]);

  useEffect(() => {
    if (userSuccess) {
      navigate("/home");
    }
  });

  const handleLogin = () => {
    const userData = {
      m_mail,
      password,
    };

    dispatch(loginUserData(userData));
  };

  return (
    <>
      <Form className="p-3 bg-white shadow rounded-3 col-xl-10  mx-auto">
        <Form.Control
          value={m_mail}
          onChange={handleChange}
          name="m_mail"
          type="text"
          className="p-2 shadow-0 "
          placeholder="Email address or phone number"
        />
        <div className="d-flex align-items-center  border my-2 rounded-2  shadow-0">
          <Form.Control
            value={password}
            onChange={handleChange}
            name="password"
            className="border-0 p-2 shadow-0"
            type={`${showPass ? "text" : "password"}`}
            placeholder="Password"
          />
          {showEye &&
            (showPass ? (
              <FaRegEye
                onClick={() => setShowPass(false)}
                className="me-2"
                cursor={"pointer"}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPass(true)}
                className="me-2"
                cursor={"pointer"}
              />
            ))}
        </div>
        <Button
          onClick={handleLogin}
          disabled={userLoading}
          variant="contained"
          className={`w-100 bg-blue p-2 ${userLoading && "bg-secondary"}  `}
        >
          {userLoading ? (
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
            "Log In"
          )}
        </Button>
        <a
          href="/"
          className="text-primary text-center d-block my-1 text-decoration-none"
        >
          Forgotten password?
        </a>
        <hr />
        <Link to="/register" className="text-white text-decoration-none">
          <Button
            variant="contained"
            className="w-50 mx-auto d-block text-capitalize py-2 px-1 bg-green"
          >
            Create new account
          </Button>
        </Link>
      </Form>
    </>
  );
};

export default LoginForm;
