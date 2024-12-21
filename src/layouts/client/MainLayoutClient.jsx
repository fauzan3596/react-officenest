import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer, NavbarClient } from "../../components";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const MainLayoutClient = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/client/login");
      } else if (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        })
      }
    }
  }, [navigate, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavbarClient />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayoutClient;
