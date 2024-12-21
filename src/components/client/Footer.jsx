import React from "react";
import logo from "../../assets/stationery.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#44486C] px-10 py-20 relative">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 text-[#BDC0CC]">
        <div className="flex flex-col">
          <img src={logo} alt="Officenest Logo" className="sm:h-20 sm:w-20 h-28 w-28 object-cover" />
          <div className="pt-7 sm:static absolute bottom-7">
            <p className="sm:w-44">&copy; 2024 OfficeNest, Inc. All rights reserved.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Quick Links</p>
          <Link to="/client">Home</Link>
          <Link to="/client/shop">Shop</Link>
          <Link to="/client/contact">Contact</Link>
          <Link to="/client/about">About</Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Our Services</p>
          <p>Shipping</p>
          <p>Returns</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Stay Connected</p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
