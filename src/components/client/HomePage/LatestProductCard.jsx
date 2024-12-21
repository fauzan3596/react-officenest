import React from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";

const LatestProductCard = ({ product }) => {
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
    <Link to={`/client/detail/${id}`} className="card card-side bg-base-100 hover:shadow-xl hover:scale-105 hover:border">
      <figure className="bg-[#f5f5f5] min-w-40 h-40 w-40">
        <AdvancedImage cldImg={cldImg} />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title text-base line-clamp-2">{name}</h2>
        <p className="text-[#79787E] font-medium">{rupiah(price)}</p>
      </div>
    </Link>
  );
};

export default LatestProductCard;
