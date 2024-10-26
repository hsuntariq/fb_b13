import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import LoginForm from "../../components/authentication/LoginForm";
import "../../components/authentication/utils/auth.css";
const Login = () => {
  return (
    <>
      <Container className="col-xl-7 col-lg-9 col-md-10 height-70 d-flex justify-content-center align-items-center col-sm-10 mx-auto">
        <Row className="w-100">
          <Col lg={6}>
            <img src={logo} width={200} alt="apnibook logo" />
            <h3 className="display-6 m-0">Recent logins</h3>
            <p className="text-secondary">
              Click your picture or add an account.
            </p>
          </Col>
          <Col lg={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;