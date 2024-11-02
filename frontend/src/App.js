import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/authentication/Register";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
