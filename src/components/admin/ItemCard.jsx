import React from "react";
import { useSelector } from "react-redux";

const ItemCard = ({ type }) => {
  const { data } = useSelector((state) => state.products);

  const categoryProduct = data?.filter((product) => product.category === type);

  const outOfStockProduct = data?.filter((product) => product.stock === 0);

  const categoryName = () => {
    switch (type) {
      case "Books & Stationery":
        return "Books & Stationery";
      case "Pens & Pencils":
        return "Pens & Pencils";
      case "Paper & Card":
        return "Paper & Card";
      case "Notebooks":
        return "Notebooks";
      case "Calendars":
        return "Calendars";
      case "Office Supplies":
        return "Office Supplies";
      case "Stock":
        return "Out of Stocks";
      default:
        return "All Products";
    }
  };

  const categoryCount = () => {
    if (type) {
      if (type === "Out of Stocks") {
        return outOfStockProduct?.length;
      } else {
        return categoryProduct?.length;
      }
    } else {
      return data?.length;
    }
  };

  return (
    <section className="card bg-[#f7fafc] w-full shadow-xl mt-4">
      <div className="card-body">
        <h2 className="card-title sm:text-xl text-base">{categoryName()}</h2>
        <div className="flex items-center">
          <p className="font-bold text-4xl">{categoryCount()}</p>
        </div>
      </div>
    </section>
  );
};

export default ItemCard;
