import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ErrorPage() {
  const { user } = useSelector((state) => state.users);

  return (
    <main className="h-screen w-full flex flex-col gap-7 justify-center items-center">
      <h1 className="text-6xl">404 Not Found!</h1>
      <h6 className="text-xl">Sorry, this page does not exist</h6>
      <Link to={user ? '/client' : '/client/login'}>
        <button className="btn bg-indigo-500 text-white font-medium">
          Go Back
        </button>
      </Link>
    </main>
  );
}

export default ErrorPage;
