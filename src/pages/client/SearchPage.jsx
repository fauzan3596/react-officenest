import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingSpinner, ProductCard } from "../../components";
import Swal from "sweetalert2";
import useSortedProducts from "../../hooks/useSortedProducts";

const SearchPage = () => {
  const { query } = useParams();

  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const filteredData = products?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const { sortedProducts, sortOption, setSortOption } =
    useSortedProducts(filteredData);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  if (error) {
    return Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
    });
  }

  return (
    <main className="min-h-screen w-full pt-14 lg:px-10 px-5 pb-10">
      <h2 className="text-3xl font-semibold text-green-700">
        Search "{query}": {sortedProducts?.length} results have been found.
      </h2>
      <div className="flex justify-between items-center text-gray-400 mt-8">
        <p className="md:flex hidden">
          There are {sortedProducts?.length} products.
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
