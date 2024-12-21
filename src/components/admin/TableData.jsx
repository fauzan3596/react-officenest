import React, { useEffect, useState } from "react";
import { Modal } from "..";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/action";

const TableData = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const showModalHandler = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const sortProducts = () => {
    if (products) {
      const sortedProducts = Object.values(products).sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      return sortedProducts;
    }
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlnqwafkc",
    },
  });

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const getImages = (imgUrl) => {
    if (imgUrl.startsWith("https://")) {
      return <img src={imgUrl} alt="Product image" />;
    } else {
      const cldImg = cld.image(imgUrl);
      cldImg.resize(fill().width(48).height(48));
      return <AdvancedImage cldImg={cldImg} />;
    }
  };

  return (
    <section className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm">
          {sortProducts()?.map((product, index) => {
            const { id, category, name, price, imgUrl, stock } = product;
            return (
              <tr key={id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="sm:avatar hidden">
                      <div className="mask mask-squircle h- w-12">
                        {getImages(imgUrl)}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
                      <div className="text-sm opacity-50">{category}</div>
                    </div>
                  </div>
                </td>
                <td>{rupiah(price)}</td>
                <td className={stock === 0 ? "text-red-500 font-medium" : ""}>
                  {stock === 0 ? "Out of Stock" : stock}
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => showModalHandler(product)}
                  >
                    Details
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        product={selectedProduct}
        isModalOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
      />
    </section>
  );
};

export default TableData;
