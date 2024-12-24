import React, { useMemo, useState } from "react";

const useFilteredProducts = (products) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter((product) => {
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
      });
  }, [products, selectedCategories, selectedPriceRange]);
  
  return {
    filteredProducts,
    selectedCategories,
    setSelectedCategories,
    selectedPriceRange,
    setSelectedPriceRange,
  };
};

export default useFilteredProducts;
