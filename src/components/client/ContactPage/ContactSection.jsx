import React from "react";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";

const ContactSection = () => {
  return (
    <header className="flex md:flex-row flex-col gap-5 sm:px-10 px-5 sm:mt-14 mt-5">
      <div className="flex-[0.5] flex flex-col gap-6">
        <h2 className="font-bold sm:text-5xl text-3xl">Contact Us</h2>
        <p>
          We're here to help—reach out to us with any questions, feedback, or
          support needs, and we'll respond promptly!
        </p>
        <div className="flex items-center gap-4">
          <MdOutlineEmail />
          <p>officenest123@gmail.com</p>
        </div>
        <div className="flex items-center gap-4">
          <MdOutlinePhone />
          <p>0877 - 5555 - 5555</p>
        </div>
        <div className="flex items-center gap-4">
          <MdOutlineLocationOn />
          <p>1234 Jakarta Timur, DKI Jakarta, Indonesia</p>
        </div>
      </div>
      <div className="flex-[0.5]">
        <form className="md:px-10">
          <div className="label">
            <p className="label-text font-medium">
              Email<span className="text-red-600">*</span>
            </p>
          </div>
          <input
            type="email"
            className="input input-bordered w-full"
            required
          />
          <div className="flex sm:flex-row flex-col sm:gap-5">
            <div className="flex-[0.5]">
              <div className="label">
                <p className="label-text font-medium">First Name</p>
              </div>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="flex-[0.5]">
              <div className="label">
                <p className="label-text font-medium">Last Name</p>
              </div>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="label">
            <p className="label-text font-medium">Message</p>
          </div>
          <textarea
            type="text"
            className="textarea textarea-bordered w-full"
            placeholder="Type your message..."
          />
          <button className="btn btn-neutral mt-3 w-28 text-white hover:scale-110">
            Submit
          </button>
        </form>
      </div>
    </header>
  );
};

export default ContactSection;
