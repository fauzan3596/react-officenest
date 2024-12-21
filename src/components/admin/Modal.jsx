import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/action";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Modal = ({ product, isModalOpen, closeModalHandler }) => {
  if (!isModalOpen || !product) return null;
  const {
    id,
    name,
    price,
    stock,
    imgUrl,
    description,
    createdAt,
    category,
    updatedAt,
  } = product;
  const dispatch = useDispatch();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlnqwafkc",
    },
  });

  const getImages = (imgUrl) => {
    if (imgUrl.startsWith("https://")) {
      return (
        <img src={imgUrl} alt="Product image" className="h-52 w-52 mx-auto" />
      );
    } else {
      const cldImg = cld.image(imgUrl);
      cldImg.resize(fill().height(208));
      return <AdvancedImage cldImg={cldImg} className="mx-auto" />;
    }
  };

  const deleteProductHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        });
        dispatch(deleteProduct(id));
        closeModalHandler();
        dispatch(getProducts());
      }
    });
  };

  return (
    <section
      className="modal modal-open fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModalHandler();
      }}
    >
      <div className="modal-box overflow-auto scrollbar-hidden">
        {getImages(imgUrl)}
        <div className="grid grid-cols-2 pt-5 pb-2">
          <strong>Name:</strong>
          <p>{name}</p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Description:</strong>
          <p>{description}</p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Category:</strong>
          <p>{category}</p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Price:</strong>
          <p>{rupiah(price)}</p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Stock:</strong>
          <p className={stock === 0 ? "text-red-500 font-medium" : ""}>
            {stock === 0 ? "Out of Stock" : stock}
          </p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Created at:</strong>
          <p>{formatDate(createdAt)}</p>
        </div>
        <div className="grid grid-cols-2 py-2">
          <strong>Updated at:</strong>
          <p>{formatDate(updatedAt)}</p>
        </div>
        <div className="modal-action">
          <Link to={`/edit/${id}`} state={{ product }}>
            <button className="btn btn-warning">Edit</button>
          </Link>
          <button
            className="btn btn-error"
            onClick={() => deleteProductHandler(id)}
          >
            Delete
          </button>
        </div>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => closeModalHandler()}
        >
          ✕
        </button>
      </div>
    </section>
  );
};

export default Modal;
