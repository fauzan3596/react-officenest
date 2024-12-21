import React from "react";

const LocationCard = ({ location }) => {
  const { name, place, imgUrl } = location;

  return (
    <div className="card bg-base-100 rounded-t-badge">
      <figure>
        <img src={imgUrl} alt="Office Location" className="rounded-badge" />
      </figure>
      <div className="card-body items-center text-center px-0">
        <h2 className="card-title sm:text-2xl text-base font-bold">{name}</h2>
        <p className="sm:text-base text-sm">{place}</p>
      </div>
    </div>
  );
};

export default LocationCard;
