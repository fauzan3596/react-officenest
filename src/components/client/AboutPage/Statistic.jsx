import React from "react";

const Statistic = () => {
  return (
    <section className="md:h-60 h-[30rem] flex flex-col md:flex-row justify-evenly items-center sm:px-10 px-5">
      <div className="text-center">
        <h6 className="font-bold text-5xl pb-2">30+</h6>
        <p>Province Served</p>
      </div>
      <div className="text-center">
        <h6 className="font-bold text-5xl pb-2">10+</h6>
        <p>Years of Experience</p>
      </div>
      <div className="text-center">
        <h6 className="font-bold text-5xl pb-2">10,000+</h6>
        <p>Products Sold Monthly</p>
      </div>
      <div className="text-center">
        <h6 className="font-bold text-5xl pb-2">98%</h6>
        <p>Customer Satisfaction Rate</p>
      </div>
    </section>
  );
};

export default Statistic;
