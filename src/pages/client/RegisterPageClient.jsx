import React, { useEffect, useState } from "react";
import logoImg from "../../assets/3dman-woman.png";
import stationery from "../../assets/stationery.png";
import rightIconImg from "../../assets/rightIcon.png";
import leftIconImg from "../../assets/leftIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { register } from "../../redux/action";

const RegisterPageClient = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        title: "Error!",
        text: "Password must be at least 6 characters long and include both letters and numbers.",
        icon: "error",
      });
      return;
    }
    dispatch(register(formData.email, formData.password));
    setFormData({ email: "", password: "" });
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/client");
      } else if (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  }, [navigate, loading, user]);

  return (
    <div className="flex md:flex-row flex-col items-center min-h-screen w-full md:py-5 md:px-10 p-0">
      <div
        className="md:w-[40%] w-full md:h-[33rem] h-[31rem] overflow-hidden relative md:rounded-3xl text-white p-10"
        style={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
      >
        <p className="text-5xl lg:text-5xl md:text-4xl font-bold pb-5 text-right">
          Welcome to OfficeNest
        </p>
        <h2 className="text-lg md:text-base lg:text-lg text-right font-medium">
          Join us today and unlock endless possibilities to organize your
          workspace and boost your productivity effortlessly!
        </h2>
        <div className="flex justify-center">
          <img src={logoImg} className="h-64 absolute -bottom-10" />
        </div>
      </div>
      <div className="flex flex-col md:w-[60%] md:h-[33rem] w-full items-center py-10 px-10 relative">
        <div className="flex items-center">
          <img src={stationery} alt="OfficeNest Logo" className="h-10 w-10" />
          <h1 className="block py-5 ps-2 text-black font-bold text-xl">
            OfficeNest
          </h1>
        </div>
        <h3 className="text-center font-semibold text-lg w-[21rem]">
          Your One-Stop Shop for Office & Stationary Essentials - Sign Up Now!
        </h3>
        <form
          className="form-control mt-4 md:px-12 w-full z-10"
          onSubmit={submitHandler}
        >
          <div className="label">
            <span className="label-text font-medium">Email</span>
          </div>
          <label className="input flex items-center gap-2 bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <div className="label">
            <span className="label-text font-medium">Password</span>
          </div>
          <label className="input bg-gray-100 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <button className="btn mt-5 text-lg bg-[#94bbe9] hover:bg-blue-600 font-semibold text-white">
            Create an Account
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/client/login">
            <span className="underline text-indigo-700 font-bold">Sign In</span>
          </Link>
        </p>
        <img src={leftIconImg} alt="icon" className="absolute left-0 top-48" />
        <img
          src={rightIconImg}
          alt="icon"
          className="absolute right-0 top-48"
        />
      </div>
    </div>
  );
};

export default RegisterPageClient;
