import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  return (
    <ClipLoader
      className="text-primary"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default LoadingSpinner;
