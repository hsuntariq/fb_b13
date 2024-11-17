import React, { useEffect, useState } from "react";
import logo from "../../assets/images/fb_logo2.png";
import { BiSearch } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { MdOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileDropDown from "./ProfileDropDown";

const Header = () => {
  const [size, setSize] = useState(window.innerWidth);
  const { user } = useSelector((state) => state.user);
  const [showPopUp, setShowPopUp] = useState(false);

  const changeSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("resize", changeSize);
    };
  });

  return (
    <>
      <div className="d-flex align-items-center position-sticky top-0 z-3 justify-content-between p-1 bg-white shadow-sm">
        <div className="search d-flex gap-3">
          <img width={40} src={logo} alt="apnibook logo" />
          <div
            className="d-flex border-0 form-control align-items-center rounded-pill"
            style={{ background: "#F0F2F5" }}
          >
            <BiSearch size={15} className="text-secondary" />
            {size >= 1250 && (
              <input
                type="search"
                name=""
                placeholder="Search apnibook"
                className="border-0 outline-0"
                style={{ background: "#F0F2F5" }}
                id=""
              />
            )}
          </div>
        </div>
        {size >= 700 && (
          <ul className="menu-items m-0  d-flex justify-content-between   w-35 list-unstyled fw-bold text-secondary-emphasis">
            <li>
              <FiHome size={25} className="text-secondary-emphasis" />
            </li>
            <li>
              <GoPeople size={25} className="text-secondary-emphasis" />
            </li>
            <li>
              <MdOndemandVideo size={25} className="text-secondary-emphasis" />
            </li>
            <li>
              <BsShop size={25} className="text-secondary-emphasis" />
            </li>
            <li>
              <SiYoutubegaming size={25} className="text-secondary-emphasis" />
            </li>
          </ul>
        )}
        <div className="right-icons d-flex gap-2">
          <div className="p-2 rounded-full" style={{ background: "#F0F2F5" }}>
            <BsFillGrid3X3GapFill size={20} />
          </div>
          <div className=" position-relative">
            <div className="p-2 rounded-full" style={{ background: "#F0F2F5" }}>
              <FaFacebookMessenger size={20} />
            </div>
            <div
              className="notification text-sm position-absolute text-white p-1 rounded-full  bg-danger text-center end-0"
              style={{ top: "-5px" }}
            >
              1
            </div>
          </div>
          <div className=" position-relative">
            <div className="p-2 rounded-full" style={{ background: "#F0F2F5" }}>
              <FaBell size={20} />
            </div>
            <div
              className="notification text-sm position-absolute text-white p-1 rounded-full  bg-danger text-center end-0"
              style={{ top: "-5px" }}
            >
              9
            </div>
          </div>

          <div className="position-relative drop-pop">
            {user?.image ? (
              <img
                src={user?.image}
                alt="user image"
                width={25}
                className="rounded-full"
              />
            ) : (
              <div
                className="position-relative drop-pop"
                onClick={() => setShowPopUp(true)}
              >
                <div
                  className="rounded-full p-2 drop-pop"
                  style={{ background: "#F0F2F5" }}
                >
                  <FaUser className="drop-pop" size={20} />
                </div>
                <div
                  className="drop position-absolute drop-pop"
                  style={{ bottom: "-3px", right: "-2px" }}
                >
                  <RiArrowDropDownLine
                    className="border bg-dark text-white drop-pop rounded-circle"
                    style={{ background: "" }}
                  />
                </div>
              </div>
            )}
            {showPopUp && <ProfileDropDown setShowPopUp={setShowPopUp} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
