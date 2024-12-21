import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/fetchApi";
import { useDispatch } from "react-redux";
import { fetchProductsSuccess } from "../../redux/productsSlice";
import { LoadingSpinner, ProductCard } from "../../components";
import Swal from "sweetalert2";

const SearchPage = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

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

  useEffect(() => {
    const filteredData = products?.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredData);
  }, [products, query]);

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortOption) {
      case "Name, A to Z":
        return a.name.localeCompare(b.name);
      case "Name, Z to A":
        return b.name.localeCompare(a.name);
      case "Price, low to high":
        return a.price - b.price;
      case "Price, high to low":
        return b.price - a.price;
      case "Date, late to new":
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      case "Date, new to late":
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      default:
        return;
    }
  });

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  if (isError) {
    return Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }

  return (
    <main className="min-h-screen w-full pt-14 lg:px-10 px-5 pb-10">
      <h2 className="text-3xl font-semibold text-green-700">
        Search "{query}": {filteredProducts?.length} results have been found.
      </h2>
      <div className="flex justify-between items-center text-gray-400 mt-8">
        <p className="md:flex hidden">
          There are {filteredProducts?.length} products.
        </p>
        <div className="flex items-center md:w-auto w-full">
          <p className="md:flex hidden w-32">Sort by:</p>
          <select
            className="select select-bordered md:w-96 w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Relevance</option>
            <option>Name, A to Z</option>
            <option>Name, Z to A</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
            <option>Date, late to new</option>
            <option>Date, new to late</option>
          </select>
        </div>
      </div>
      <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {sortedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
