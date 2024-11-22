import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/authentication/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import OTP from "./pages/authentication/OTP";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimic resource loading
    const handleLoad = () => {
      setLoading(false); // Set loading to false when the page is fully loaded
    };

    // Attach the event listener for when the page is fully loaded
    window.addEventListener("load", handleLoad);

    // Cleanup
    return () => window.removeEventListener("load", handleLoad);
  }, []);
  if (loading) {
    return <h1 className="display-1">Loading...</h1>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          <Route path="/otp" element={<OTP />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
