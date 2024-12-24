import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick, forcePage }) => {
  return (
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
  );
};

export default Pagination;
