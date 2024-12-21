import React from "react";

const CategoryCard = ({ category }) => {
  const { name, imgUrl } = category;

  return (
    <div className="avatar flex flex-col">
      <div className="rounded-full">
        <img src={imgUrl} />
      </div>
      <p className="font-semibold text-[#525059] mt-3">{name}</p>
    </div>
  );
};

export default CategoryCard;
