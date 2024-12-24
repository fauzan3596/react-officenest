import React from "react";
import stationery from "../../../assets/stationery.png";
import { NavLink } from "react-router-dom";

const SideNavbar = () => {
  const navLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "navy" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        <li className="mb-4">
          <div className="flex items-center">
            <img src={stationery} alt="OfficeNest Logo" className="h-10 w-10" />
            <h1 className="block ps-1 text-black font-bold text-xl">
              OfficeNest
            </h1>
          </div>
        </li>
        <li>
          <NavLink
            to="/client"
            style={navLinkStyle}
            end
            className="rounded-badge"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/client/shop"
            style={navLinkStyle}
            className="rounded-badge"
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/client/about"
            style={navLinkStyle}
            className="rounded-badge"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/client/contact"
            style={navLinkStyle}
            className="rounded-badge"
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
