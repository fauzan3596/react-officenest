import React, { useState } from "react";
import { TableData } from "../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MasterDataPage() {
  const { data } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const filteredProducts = data
    ? Object.values(data).filter((product) => {
        const searchResults = Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());

        const filterResults = filter ? product.category === filter : true;

        return searchResults && filterResults;
      })
    : [];

  return (
    <main className="h-screen w-full px-5 pt-5">
      <div className="breadcrumbs text-xl">
        <ul>
          <li>Master Data</li>
        </ul>
      </div>
      <div className="flex md:items-center md:justify-between flex-col md:flex-row pt-4">
        <h2 className="text-xl font-medium">Products List</h2>
        <div className="flex md:flex-row md:items-center flex-col gap-3">
          <form className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </form>
          <div className="flex gap-3 justify-end">
            <select
              className="select select-bordered w-44"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Books & Stationery">Books & Stationery</option>
              <option value="Pens & Pencils">Pens & Pencils</option>
              <option value="Paper & Card">Paper & Card</option>
              <option value="Notebooks">Notebooks</option>
              <option value="Calendars">Calendars</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
            <Link to="/add">
              <button className="btn bg-indigo-400 text-white hover:bg-indigo-700">
                + Add New
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TableData products={filteredProducts} />
    </main>
  );
}

export default MasterDataPage;
