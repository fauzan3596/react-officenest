import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../services/fetchApi";
import { fetchProductsSuccess } from "../../redux/productsSlice";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner, ProductCard } from "../../components";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const ShopPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onSuccess: (data) => {
      dispatch(fetchProductsSuccess(data));
    },
  });
  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);

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

  const filteredProducts = products
    ?.filter((product) => {
      if (selectedCategories.length > 0) {
        return selectedCategories.includes(product.category);
      }
      return true;
    })
    .filter((product) => {
      if (selectedPriceRange.length > 0) {
        const price = product.price;
        return selectedPriceRange.some((range) => {
          switch (range) {
            case "100000":
              return price <= 100000;
            case "500000":
              return price > 100000 && price <= 500000;
            case "1000000":
              return price > 500000 && price <= 1000000;
            case "1000000+":
              return price > 1000000;
            default:
              return true;
          }
        });
      }
      return true;
    })
    .sort((a, b) => {
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

  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts?.length / itemsPerPage);

  const filterPrice = () => (
    <div className="flex flex-col pt-5 gap-4">
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("100000")}
        />
        <p>Rp 0 - 100.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("500000")}
        />
        <p>Rp 100.000 - 500.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("1000000")}
        />
        <p>Rp 500.000 - 1.000.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("1000000+")}
        />
        <p>Rp 1.000.000 +</p>
      </div>
    </div>
  );

  if (isError) {
    Swal.fire({
      title: "Error!",
      text: "Failted to fetch products",
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
        {filterPrice()}
      </div>
      <div className="lg:flex-[0.75] md:flex-[0.7]">
        <div className="flex justify-between items-center text-gray-400">
          <p className="md:flex hidden">
            There are {filteredProducts?.length} products.
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
                  {filterPrice()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-center sm:text-base text-sm block md:hidden mt-5">
          Showing {itemOffset + 1}-
          {endOffset <= filteredProducts?.length
            ? endOffset
            : filteredProducts?.length}{" "}
          of {filteredProducts?.length} products
        </p>
        {isLoading ? (
          <LoadingSpinner loading={isLoading} />
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
            {endOffset <= filteredProducts?.length
              ? endOffset
              : filteredProducts?.length}{" "}
            of {filteredProducts?.length} products
          </p>
          {filteredProducts?.length >= itemsPerPage && (
            <ReactPaginate
              className="join"
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              breakClassName="join-item btn sm:btn-md btn-sm bg-white"
              breakLinkClassName="text-black rounded-full bg-transparent"
              pageCount={pageCount}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              pageClassName=""
              pageLinkClassName="join-item btn sm:btn-md btn-sm text-black rounded-full bg-white"
              previousLinkClassName={`page-link bg-white join-item btn sm:btn-md btn-sm text-black rounded-full ${
                forcePage === 0 ? "btn-disabled" : ""
              }`}
              nextLinkClassName={`join-item bg-white btn sm:btn-md btn-sm text-black rounded-full ${
                forcePage === pageCount - 1 ? "btn-disabled" : ""
              }`}
              activeClassName="active border-0 bg-purple-500"
              activeLinkClassName="page-link !bg-purple-500 text-white font-bold border-0 "
              forcePage={forcePage}
              disabledClassName="cursor-not-allowed"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
