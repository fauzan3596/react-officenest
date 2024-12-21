import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import stationery from "../../assets/stationery.png";
import { MdDashboard } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "navy" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
  });

  const logOutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="drawer lg:drawer-open z-10 lg:sticky fixed">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#EDF2F7] flex items-center justify-between lg:hidden px-2">
        <div className="flex items-center">
          <img src={stationery} alt="OfficeNest Logo" className="h-10 w-10" />
          <h1 className="block py-5 ps-2 text-black font-bold text-xl">
            OfficeNest
          </h1>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn drawer-button bg-[#EDF2F7] lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-[#2C5282] sm:text-lg text-base gap-3 min-h-full sm:w-64 w-56 p-4">
          <li className="mb-4">
            <Link to="/">
              <div className="flex items-center">
                <img
                  src={stationery}
                  alt="OfficeNest Logo"
                  className="h-10 w-10"
                />
                <h1 className="block ps-1 text-black font-bold text-xl">
                  OfficeNest
                </h1>
              </div>
            </Link>
          </li>
          <li className="hover:bg-blue-100 rounded-lg">
            <NavLink to="/" style={navLinkStyle}>
              <MdDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="hover:bg-blue-100 rounded-lg">
            <NavLink to="/data" style={navLinkStyle}>
              <AiFillDatabase />
              Master Data
            </NavLink>
          </li>
          <li onClick={logOutHandler} className="hover:bg-blue-100 rounded-md">
            <p>
              <RiLogoutCircleRFill />
              Log Out
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
