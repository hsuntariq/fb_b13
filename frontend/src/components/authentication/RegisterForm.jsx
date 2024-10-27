import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [months] = useState([
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ]);
  const [formFields, setFormFields] = useState({
    f_name: "",
    l_name: "",
    gender: "",
    date: new Date().getDate(),
    month: months[new Date().getMonth()],
    year: new Date().getFullYear(),
    m_mail: "",
    password: "",
  });

  //   destructure

  const { f_name, l_name, date, month, year, m_mail, password, gender } =
    formFields;

  const [years, setYears] = useState([]);

  const getCurrentYear = new Date().getFullYear();
  const getStartYear = 1905;

  //   fill the years arrray with the years
  useEffect(() => {
    let temp = [];
    for (let i = getCurrentYear; i >= getStartYear; i--) {
      temp.push(i);
    }

    setYears(temp);
  }, []);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  //   handle the registration of user

  const handleRegister = async (e) => {
    e.preventDefault();
    // const response = await fetch(
    //   "http://localhost:3001/api/user/register-user",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       f_name,
    //       l_name,
    //       m_mail,
    //       gender,
    //       password,
    //       dob: `${date}-${month}-${year}`,
    //     }),
    //   }
    // );
    // const data = await response.json();
    // console.log(data);

    // send request through axios

    const dataForBE = {
      f_name,
      l_name,
      m_mail,
      password,
      gender,
      dob: `${date}-${month}-${year}`,
    };

    const response = await axios.post(
      "http://localhost:3001/api/user/register-user",
      dataForBE
    );

    console.log(response.data);
  };

  return (
    <>
      <Card className="shadow border-0 p-4 rounded-3 col-lg-5  col-md-7 col-sm-9 mx-auto">
        <Form>
          <h4 className="text-center">Create a new account</h4>
          <p className="text-secondary text-center">It's quick and easy.</p>
          <hr />
          <div className="d-flex gap-2">
            <Form.Control
              value={f_name}
              onChange={handleChange}
              placeholder="First name"
              type="text"
              name="f_name"
            />
            <Form.Control
              value={l_name}
              onChange={handleChange}
              placeholder="Surname"
              type="text"
              name="l_name"
            />
          </div>
          <Form.Label className="text-md">
            Date of birth{" "}
            <span className="bg-secondary text-white p-1 rounded-full text-sm">
              ?
            </span>{" "}
          </Form.Label>
          <div className="d-flex gap-2">
            <Form.Select name="date" value={date} onChange={handleChange}>
              {Array.from({ length: 31 }).map((_, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select
              name="month"
              className="text-capitalize"
              value={month}
              onChange={handleChange}
            >
              {months?.map((item, index) => {
                return (
                  <option key={index} className="text-capitalize" value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select name="year" value={year} onChange={handleChange}>
              {years?.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <Form.Label className="text-md">
            Gender{" "}
            <span className="bg-secondary text-white p-1 rounded-full text-sm">
              ?
            </span>{" "}
          </Form.Label>
          <div className="d-flex gap-2 justify-content-between">
            <div className="border d-flex p-1 justify-content-between rounded-3 w-100">
              <Form.Label className="text-md">Female</Form.Label>
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-check"
                onChange={handleChange}
                aria-selected="false"
              />
            </div>
            <div className="border d-flex p-1 justify-content-between rounded-3 w-100">
              <Form.Label className="text-md">Male</Form.Label>
              <input
                aria-selected="false"
                type="radio"
                name="gender"
                value="male"
                className="form-check"
                onChange={handleChange}
              />
            </div>
          </div>
          <Form.Control
            type="text"
            placeholder="Mobile number or email address"
            name="m_mail"
            value={m_mail}
            className="my-2"
            onChange={handleChange}
          />
          <Form.Control
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            className="my-2"
            onChange={handleChange}
          />
          <p className="text-sm text-secondary">
            People who use our service may have uploaded your contact
            information to Facebook. Learn more.
          </p>
          <p className="text-sm text-secondary">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy. You may receive SMS notifications from us and can
            opt out at any time.
          </p>
          <Button
            onClick={handleRegister}
            variant="contained"
            className="bg-green w-50 d-block mx-auto fw-bold p-1 rounded-2"
          >
            Sign Up
          </Button>
          <Link
            to="/"
            className="text-primary d-block text-center my-2 text-decoration-none"
          >
            Already have an account?
          </Link>
        </Form>
      </Card>
    </>
  );
};

export default RegisterForm;
