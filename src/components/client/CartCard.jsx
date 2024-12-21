import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteCart, updateCart } from "../../services/fetchApi";
import Swal from "sweetalert2";

const CartCard = ({ cart }) => {
  const { id, name, price, imgUrl, quantity, stock } = cart;
  const [quantityItem, setQuantityItem] = useState(quantity);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });

  useEffect(() => {
    if (quantityItem < 1) {
      setQuantityItem(1);
      deleteMutation.mutate(id);
      return;
    }

    if (quantityItem > stock) {
      setQuantityItem(stock);
      Swal.fire({
        title: "Out of Stock!",
        icon: "error",
      });
      return;
    }

    const newCart = {
      ...cart,
      quantity: Number(quantityItem),
    };
    updateMutation.mutate({ id, cart: newCart });
  }, [quantityItem]);

  const deleteMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });

  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

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

  // if (quantity > stock) {
  //   alert("error")
  // }

  return (
    <div className="card card-side sm:card-normal card-compact bg-base-100 border">
      <figure className="bg-[#f5f5f5] max-w-40 min-w-40">
        <AdvancedImage cldImg={cldImg} />
      </figure>
      <div className="card-body text-left">
        <div className="flex md:flex-row flex-col gap-2 items-start">
          <div className="md:flex-[0.25] flex flex-col gap-2">
            <h2 className="card-title line-clamp-2 sm:text-base text-xs">
              {name}
            </h2>
            <p className="text-red-500 font-medium sm:text-base text-xs">
              {rupiah(price)}
            </p>
          </div>
          <div className="md:flex-[0.3] flex justify-center">
            <div className="flex items-center border rounded-full">
              <button
                onClick={() => setQuantityItem((prev) => prev - 1)}
                className="text-xl font-bold px-3 rounded-l-full py-2 hover:bg-[#e84f69] hover:text-white"
              >
                &minus;
              </button>
              <input
                type="number"
                className="lg:w-14 md:w-10 w-14 text-center [&::-webkit-inner-spin-button]:appearance-none py-2 focus:outline-none"
                value={quantityItem}
                onChange={(e) => setQuantityItem(Number(e.target.value))}
              />
              <button
                onClick={() => setQuantityItem((prev) => prev + 1)}
                className="text-xl font-bold px-3 rounded-r-full py-2 hover:bg-[#e84f69] hover:text-white"
              >
                +
              </button>
            </div>
          </div>
          <div className="md:flex-[0.3]">
            <p className="text-center font-semibold sm:text-base text-xs">{`${rupiah(
              price * quantity
            )}`}</p>
          </div>
          <div className="md:flex-[0.15] flex justify-end w-full">
            <FaTrash
              className="cursor-pointer"
              onClick={() => deleteHandler(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
