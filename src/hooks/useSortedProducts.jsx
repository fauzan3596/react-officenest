import React, { useMemo, useState } from "react";

const useSortedProducts = (products) => {
  const [sortOption, setSortOption] = useState("Relevance");

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    return products.sort((a, b) => {
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
          return 0;
      }
    });
  }, [products, sortOption]);

  return {
    sortedProducts,
    sortOption,
    setSortOption,
  };
};

export default useSortedProducts;
