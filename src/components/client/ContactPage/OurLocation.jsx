import React from "react";
import LocationCard from "./LocationCard";
import { useSelector } from "react-redux";

const OurLocation = () => {
  const locations = useSelector((state) => state.locations);

  return (
    <section className="flex justify-center items-center min-h-screen sm:px-10 px-5 sm:py-14 pb-10 mt-14">
      <div className="flex flex-col text-center items-center gap-5">
        <h2 className="font-bold sm:text-5xl text-3xl">Our Locations</h2>
        <p className="sm:w-[35rem]">
          Visit us at our convenient location, where quality stationery and
          office essentials are always within your reach.
        </p>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 pt-5">
          {
            locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
