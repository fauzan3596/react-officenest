import React from "react";
import { Link } from "react-router-dom";

const Tagline = () => {
  return (
    <section className="flex sm:px-10 px-5 md:flex-row flex-col gap-5 py-14">
      <div className="flex-[0.5]">
        <h2 className="font-semibold">Tagline</h2>
        <p className="font-bold sm:text-5xl text-3xl mt-1">
          Your One-Stop Shop for Office & Stationary Essentials
        </p>
      </div>
      <div className="flex-[0.5]">
        <p className="sm:text-base text-sm">
          At OfficeNest, we bring together everything you need to keep your
          workspace efficient, organized, and inspired. Find everything you need
          to stay productive and organized in one place. From quality stationery
          to essential office tools, we've got you covered for every project and
          workspace.
        </p>
        <div className="flex mt-5 gap-5">
          <Link to="/client/contact" className="btn btn-neutral text-white w-28 hover:scale-110 rounded-badge">Contact Us</Link>
          <button className="btn btn-outline w-36 hover:scale-110 rounded-badge">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Tagline;
