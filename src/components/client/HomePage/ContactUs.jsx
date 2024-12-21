import React from "react";
const ContactUs = () => {
  return (
    <section className="flex justify-center items-center text-center bg-contactUsImg background-image px-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-[#2C3066] text-3xl">Contact Us</h2>
        <p className="font-medium text-gray-700 text-xl">
          Reach Out to Our Dedicated Customer Service Team
        </p>
        <div className="flex sm:flex-row flex-col gap-5">
          <input
            type="text"
            placeholder="Email Us"
            className="input sm:w-2/3 w-full rounded-badge"
          />
          <button className="btn sm:w-1/3 w-full rounded-badge bg-[#2E356C] font-semibold text-[#CDD0DC] border-none hover:bg-[#2E356C] hover:scale-110 hover:text-white">
            Call Us Now
          </button>
        </div>
        <div className="flex sm:flex-row flex-col gap-5 sm:mt-0 mt-10">
          <button className="btn sm:w-1/2 w-full rounded-badge bg-white font-semibold text-[#B9BBCC] border-none hover:scale-110 hover:bg-white">
           Live Chat
          </button>
          <button className="btn sm:w-1/2 w-full rounded-badge bg-white font-semibold text-[#B9BBCC] border-none hover:scale-110 hover:bg-white">
            Visit Our Store
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
