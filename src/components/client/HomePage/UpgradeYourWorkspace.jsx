import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../services/fetchApi";
import { useDispatch } from "react-redux";
import { fetchProductsSuccess } from "../../../redux/productsSlice";
import ProductCard from "../ProductCard";
import LoadingSpinner from "../../LoadingSpinner";
import Swal from "sweetalert2";

const UpgradeYourWorkspace = () => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onSuccess: (data) => {
      dispatch(fetchProductsSuccess(data));
    },
  });

  if (isError) {
    return Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }

  return (
    <section className="text-center sm:mt-28 mt-10 px-5">
      <h2 className="font-semibold text-[#35384F] text-4xl">
        Upgrade Your Workspace
      </h2>
      <p className="text-[#88868A] font-medium mt-3 text-lg sm:w-[30rem] mx-auto sm:pb-10 pb-5">
        Elevate Your Productivity with Our Meticuluosly Crafted Stationery and
        Office Solutions
      </p>
      {isLoading ? (
        <LoadingSpinner loading={isLoading} />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:px-10 sm:gap-10">
          {products?.slice(0, 4).map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      )}
    </section>
  );
};

export default UpgradeYourWorkspace;
