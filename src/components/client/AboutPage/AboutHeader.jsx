import React from "react";
import aboutHeaderImg from "../../../assets/aboutHeaderBg.png"

const AboutHeader = () => {
  return (
    <header className="flex flex-col sm:px-10 px-5">
      <div className="flex md:flex-row flex-col gap-5 sm:mt-14 mt-5">
        <div className="flex-[0.5]">
          <h2 className="font-bold sm:text-5xl text-3xl">
          Essential Tools to Empower Your Productivity
          </h2>
        </div>
        <div className="flex-[0.5]">
          <p className="sm:text-base text-sm">
            Discover a curated selection of premium stationery and office tools
            designed to keep your workspace organized and your creativity
            flowing. Whether you're drafting big ideas or tackling daily tasks,
            our range combines functionality, quality, and style to meet the
            demands of modern professionals. Let us be your partner in
            productivity, equipping you with the essentials to work smarter and
            achieve more.
          </p>
        </div>
      </div>
      <div className="py-10">
        <img src={aboutHeaderImg} alt="About Header Image" className="rounded-xl md:h-[30rem] w-full" />
      </div>
    </header>
  );
};

export default AboutHeader;
