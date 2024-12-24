import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FilterByPrice,
  LoadingSpinner,
  Pagination,
  ProductCard,
} from "../../components";
import Swal from "sweetalert2";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import useSortedProducts from "../../hooks/useSortedProducts";

const ShopPage = () => {
  const categories = useSelector((state) => state.categories);
  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const {
    filteredProducts,
    selectedCategories,
    setSelectedCategories,
    selectedPriceRange,
    setSelectedPriceRange,
  } = useFilteredProducts(products);

  const { sortedProducts, sortOption, setSortOption } =
    useSortedProducts(filteredProducts);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newForcePage = event.selected;
    setItemOffset(newOffset);
    setForcePage(newForcePage);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setForcePage(0);
    setItemOffset(0);
    window.scrollTo(0, 0);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange((prev) =>
      prev.includes(priceRange)
        ? prev.filter((item) => item !== priceRange)
        : [...prev, priceRange]
    );
    setForcePage(0);
    setItemOffset(0);
    window.scrollTo(0, 0);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = sortedProducts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts?.length / itemsPerPage);

  if (error) {
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
    });
  }

  return (
    <main className="min-h-screen w-full flex pt-14 lg:px-10 px-5 pb-10">
      <div className="lg:flex-[0.25] md:flex-[0.3] hidden md:flex flex-col">
        <h2 className="font-bold text-xl text-[#01213a] pb-4">FILTER BY</h2>
        <hr className="border-[1px] me-8" />
        <h4 className="pt-5 text-[#01213a] font-medium text-lg">Categories</h4>
        <div className="flex flex-col pt-5 gap-4">
          {categories.map((category) => (
            <div className="flex flex-row gap-5" key={category.id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
        <h4 className="pt-8 text-[#01213a] font-medium text-lg">Price</h4>
        <FilterByPrice
          handlePriceRangeChange={handlePriceRangeChange}
          selectedPriceRange={selectedPriceRange}
        />
      </div>
      <div className="lg:flex-[0.75] md:flex-[0.7] flex-1">
        <div className="flex justify-between items-center text-gray-400">
          <p className="md:flex hidden">
            There are {sortedProducts?.length} products.
          </p>
          <div className="flex items-center md:justify-between gap-10 md:w-auto w-full">
            <p className="md:flex hidden w-32">Sort by:</p>
            <select
              className="select select-bordered w-full"
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
            <div className="drawer drawer-end z-10 md:hidden flex">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content w-full">
                <label
                  htmlFor="my-drawer"
                  className="btn bg-[#e84f69] text-white hover:bg-rose-800 drawer-button w-full"
                >
                  Filter
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                  <h2 className="font-bold text-xl text-[#01213a] pb-4">
                    FILTER BY
                  </h2>
                  <hr className="border-[1px] me-8" />
                  <h4 className="pt-5 text-[#01213a] font-medium text-lg">
                    Categories
                  </h4>
                  <div className="flex flex-col pt-5 gap-4">
                    {categories.map((category) => (
                      <div className="flex flex-row gap-5" key={category.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryChange(category.name)}
                        />
                        <p>{category.name}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="pt-8 text-[#01213a] font-medium text-lg">
                    Price
                  </h4>
                  <FilterByPrice
                    handlePriceRangeChange={handlePriceRangeChange}
                    selectedPriceRange={selectedPriceRange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-center sm:text-base text-sm block md:hidden mt-5">
          Showing {itemOffset + 1}-
          {endOffset <= sortedProducts?.length
            ? endOffset
            : sortedProducts?.length}{" "}
          of {sortedProducts?.length} products
        </p>
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : (
          <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {currentProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="flex lg:flex-row flex-col items-center justify-between mt-5 gap-5">
          <p className="text-gray-400 sm:text-base text-sm">
            Showing {itemOffset + 1}-
            {endOffset <= sortedProducts?.length
              ? endOffset
              : sortedProducts?.length}{" "}
            of {sortedProducts?.length} products
          </p>
          {sortedProducts?.length >= itemsPerPage && (
            <Pagination
              pageCount={pageCount}
              forcePage={forcePage}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
