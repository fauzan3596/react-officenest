import React from "react";

const FilterByPrice = ({ handlePriceRangeChange, selectedPriceRange }) => {
  return (
    <div className="flex flex-col pt-5 gap-4">
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("100000")}
          checked={selectedPriceRange?.includes("100000")}
        />
        <p>Rp 0 - 100.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("500000")}
          checked={selectedPriceRange?.includes("500000")}
        />
        <p>Rp 100.000 - 500.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("1000000")}
          checked={selectedPriceRange?.includes("1000000")}
        />
        <p>Rp 500.000 - 1.000.000</p>
      </div>
      <div className="flex flex-row gap-5">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handlePriceRangeChange("1000000+")}
          checked={selectedPriceRange?.includes("1000000+")}
        />
        <p>Rp 1.000.000 +</p>
      </div>
    </div>
  );
};

export default FilterByPrice;
