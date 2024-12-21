import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="md:h-screen h-[33rem] relative md:bg-headerImg background-image bg-[#ced0e4]">
      <div className="absolute md:left-1/2 top-20 flex flex-col gap-5 px-5 sm:px-10 md:text-left text-center">
        <h4 className="font-semibold text-[#545A70] md:text-2xl text-3xl">
          Online Store for Stationery and Office Supplies
        </h4>
        <h1 className="font-semibold text-[#17184A] md:text-6xl text-4xl">
          Welcome to Our E-Commerce Nest
        </h1>
        <p className="font-medium text-[#757889] text-xl">
          Discover a Curated Collection of High-Quality Stationery and Office
          Essentials
        </p>
        <Link to="/client/shop" className="btn md:w-1/3 rounded-badge bg-[#202450] text-[#B5B9CB] font-semibold hover:scale-105 hover:bg-[#202450] hover:text-white">Shop Now</Link>
      </div>
    </header>
  );
};

export default Header;
