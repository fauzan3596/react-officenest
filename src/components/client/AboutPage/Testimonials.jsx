import React from "react";
import CustomerCard from "./CustomerCard";
import { useSelector } from "react-redux";

const Testimonials = () => {
  const testimonials = useSelector((state) => state.testimonials);

  return (
    <section className="flex justify-center items-center min-h-screen sm:px-10 px-5 sm:py-14 pb-10 mt-14">
      <div className="flex flex-col text-center items-center gap-5">
        <h2 className="font-bold sm:text-5xl text-3xl">
          What Our Customers Say
        </h2>
        <p className="sm:w-[35rem]">
          Our clients praise our quality products, wide selection, and excellent
          service, making us their trusted choice for productivity essentials.
        </p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 pt-5">
          {testimonials?.map((testimonial) => (
            <CustomerCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
