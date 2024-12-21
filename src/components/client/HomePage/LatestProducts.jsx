import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../services/fetchApi";
import { fetchProductsSuccess } from "../../../redux/productsSlice";
import Swal from "sweetalert2";
import LoadingSpinner from "../../LoadingSpinner";
import LatestProductCard from "./LatestProductCard";
import stationeryToolsImg from "../../../assets/stationerytools.png";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const sortProducts = () => {
    const sortedProducts = Object.values(products).sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    return sortedProducts;
  };

  if (isError) {
    return Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }

  return (
    <section className="text-center sm:mt-20 mt-10 px-5">
      <h2 className="font-semibold text-[#35384F] text-4xl">
        Discover Our Latest Arrivals
      </h2>
      <p className="text-[#88868A] font-medium mt-3 text-lg sm:w-[30rem] mx-auto sm:pb-10 pb-5">
        Browse Our Wide Range of Innovative Stationery and Office Products
      </p>
      {isLoading ? (
        <LoadingSpinner loading={isLoading} />
      ) : (
        <div className="flex lg:flex-row flex-col sm:px-10 gap-5">
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {sortProducts()
                .slice(0, 6)
                .map((product, index) => (
                  <LatestProductCard key={index} product={product} />
                ))}
            </div>
          </div>
          <div className="lg:w-1/3 relative bg-[#b1c0d4]">
            <img
              src={stationeryToolsImg}
              alt="Stationery Tools Image"
              className="md:w-auto sm:w-80 w-72"
            />
            <div className="lg:bottom-5 lg:left-0 md:bottom-40 sm:bottom-20 left-1/2 bottom-16 absolute text-left px-5">
              <p className="text-white pb-2">Mix & Match</p>
              <p className="text-white font-semibold md:text-3xl sm:text-lg pb-4">
                Stock up your desk with our 3 for 2 stationery
              </p>
              <Link
                to="/client/shop"
                className="btn btn-outline border-white border-2 w-28 text-white rounded-badge font-medium hover:bg-[#d23b51] hover:border-0 hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
