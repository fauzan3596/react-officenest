import React from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useSelector } from "react-redux";

const WelcomeCard = () => {
  const { user } = useSelector((state) => state.users);
  const todayDate = new Date();

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${hour < 10 ? "0" + hour : hour} : ${
      minute < 10 ? "0" + minute : minute
    } : ${second < 10 ? "0" + second : second}`;
  };

  const greetingMessage = () => {
    if (todayDate.getHours() >= 6 && todayDate.getHours() < 12) {
      return `Good Morning, ${user?.email}`;
    } else if (todayDate.getHours() >= 12 && todayDate.getHours() < 18) {
      return `Good Afternoon, ${user?.email}`;
    } else {
      return `Good Evening, ${user?.email}`;
    }
  };

  const greetingIcon = () => {
    if (todayDate.getHours() >= 6 && todayDate.getHours() < 18) {
      return (
        <IoSunny className="text-[#1E9FF2] w-10 h-10 sm:w-14 sm:h-14 me-3" />
      );
    } else {
      return (
        <IoMoon className="text-[#1E9FF2] w-10 h-10 sm:w-14 sm:h-14 me-3" />
      );
    }
  };

  return (
    <section className="card bg-[#f7fafc] w-full shadow-xl mt-4">
      <div className="card-body">
        <h2 className="card-title sm:text-xl text-base">{greetingMessage()}</h2>
        <div className="flex items-center">
          {greetingIcon()}
          <div className="flex-col flex gap-1 sm:text-xl text-base">
            <p>{formatDate(todayDate)}</p>
            <p>{formatTime(todayDate)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;
