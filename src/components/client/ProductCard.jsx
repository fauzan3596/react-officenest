import React from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id, name, price, imgUrl } = product;

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlnqwafkc",
    },
  });
  const cldImg = cld.image(imgUrl);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <Link to={`/client/detail/${id}`} className="card bg-base-100 hover:shadow-xl hover:scale-105 hover:border">
      <figure className="bg-[#f5f5f5] py-10">
        <AdvancedImage cldImg={cldImg} className="mx-auto h-48 w-auto" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title line-clamp-1">{name}</h2>
        <p className="text-[#79787E] font-medium mt-2">{rupiah(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
