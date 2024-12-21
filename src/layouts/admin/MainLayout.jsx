import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";

function MainLayout() {
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      }
    }
  }, [navigate, loading]);

  return (
    <div className="h-screen lg:flex overflow-hidden">
      <div className="flex">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="h-screen flex items-center">
            <LoadingSpinner loading={loading} />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default MainLayout;
