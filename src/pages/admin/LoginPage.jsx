import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { authState, googleLogin, login } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  const loginGoogleHandler = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    dispatch(authState());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/");
      } else if (error) {
        let errorMessage = error.message;

        if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
          errorMessage = "Invalid email or password";
        }

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      }
    }
  }, [navigate, loading, user]);

  return (
    <main className="h-screen w-full flex justify-center items-center bg-indigo-500 relative overflow-hidden">
      <div className="p-10 bg-indigo-50 rounded-3xl">
        <h1 className="text-3xl font-bold text-center mb-5">
          Sign In to Your Account
        </h1>
        <p className="text-center w-[21rem] justify-self-center font-semibold text-gray-500">
          Your One-Stop Shop for Office & Stationary Essentials - Sign In to
          Explore!
        </p>
        <form className="form-control mt-4" onSubmit={submitHandler}>
          <div className="label">
            <span className="label-text font-medium">Email</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="label">
            <span className="label-text font-medium">Password</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn mt-5 text-lg bg-indigo-400 hover:bg-indigo-600 font-semibold text-white">
            Sign In
          </button>
        </form>
        <div className="divider">Or Sign In With</div>
        <button
          className="btn text-lg btn-outline font-semibold w-full"
          onClick={loginGoogleHandler}
        >
          <FcGoogle />
          Google
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="underline cursor-pointer text-indigo-700">
              Register Now
            </span>
          </Link>
        </p>
      </div>
      <div className="absolute w-60 h-60 rounded-xl bg-indigo-300 -top-5 -left-16 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-indigo-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="absolute w-40 h-40 bg-indigo-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="absolute w-20 h-40  bg-indigo-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </main>
  );
}

export default LoginPage;
