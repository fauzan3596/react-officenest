import React from "react";
import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";

const BrowseByCategories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <section className="text-center mt-10 px-5">
      <h2 className="font-semibold text-[#35384F] text-4xl">
        Browse By Categories
      </h2>
      <p className="text-[#88868A] font-medium mt-3 text-lg sm:w-[30rem] mx-auto">
        Essential Office Supplies in Our Online Stationery Shop That Keep Your
        Office Operations Smooth and Efficient
      </p>
      <div className="mt-6 grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-8 sm:px-10">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategories;
