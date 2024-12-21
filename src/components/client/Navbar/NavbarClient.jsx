import React, { useState } from "react";
import stationery from "../../../assets/stationery.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "../../../services/fetchApi";
import { SearchModal } from "../../";

const NavbarClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: carts } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  const logOutHandler = () => {
    dispatch(logoutUser());
    navigate("/client/login");
  };

  const totalItems = carts?.reduce((total, cart) => {
    return total + cart.quantity;
  }, 0);

  const totalPrice = carts?.reduce((total, cart) => {
    return total + cart.quantity * cart.price;
  }, 0);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const navLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "navy" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <div className="drawer sticky top-0 z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
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
          <div className="navbar-start lg:justify-start justify-end">
            <img
              src={stationery}
              alt="OfficeNest Logo"
              className="h-10 w-10 lg:flex hidden"
            />
            <h1 className="block ps-2 text-black font-bold text-xl">
              OfficeNest
            </h1>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
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
          <div className="navbar-end">
            <div
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm badge-secondary indicator-item">
                    {totalItems}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {totalItems} Products
                  </span>
                  <span className="text-primary font-medium">
                    Subtotal: {rupiah(totalPrice)}
                  </span>
                  <div className="card-actions">
                    <Link
                      to="/client/cart"
                      className="btn btn-primary btn-block"
                    >
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logOutHandler}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li className="mb-4">
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
      <SearchModal />
    </div>
  );
};

export default NavbarClient;
