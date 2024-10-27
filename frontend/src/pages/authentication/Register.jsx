import React from "react";
import { Container } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import RegisterForm from "../../components/authentication/RegisterForm";
const Register = () => {
  return (
    <>
      <Container>
        <img
          width={200}
          src={logo}
          alt="apnibook logo"
          className="d-block mx-auto"
        />
        <RegisterForm />
      </Container>
    </>
  );
};

export default Register;
