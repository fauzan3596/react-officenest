import React from "react";

const CustomerCard = ({ testimonial }) => {
  const { name, title, description, imgUrl, job } = testimonial;

  return (
    <div className="card bg-base-100 shadow-xl border items-start">
      <figure className="px-5 pt-5">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={imgUrl} />
          </div>
        </div>
      </figure>
      <div className="card-body text-left pt-6">
        <h2 className="card-title font-bold text-3xl">“{title}”</h2>
        <p>{description}</p>
        <div>
          <p className="font-bold text-2xl mt-5">{name}</p>
          <p>{job}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
