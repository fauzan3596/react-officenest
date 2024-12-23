import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addProductToCart,
  fetchCartsById,
  fetchProductById,
} from "../../services/fetchApi";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { LoadingSpinner } from "../../components";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, setQuantity } from "../../redux/quantitySlice";

const DetailProductPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const { data: cart, refetch } = useQuery({
    queryKey: ["cart", id],
    queryFn: () => fetchCartsById(id),
  });

  const { value: quantity } = useSelector((state) => state.quantity);

  const addMutation = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
      refetch();
    },
  });

  const addToCartHandler = () => {
    const productCart = { ...product, quantity: quantity };
    addMutation.mutate(productCart);
    dispatch(setQuantity(1));
  };

  useEffect(() => {
    dispatch(setQuantity(1));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  if (isError) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }

  const { name, description, price, imgUrl, stock } = product;

  
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

  if (quantity > stock) {
    if (stock > 0) {
      dispatch(setQuantity(stock));
      Swal.fire({
        title: "Out of Stock!",
        text: "Cannot exceed stock limit!",
        icon: "error",
      });
    }
  }

  if (quantity > stock - cart?.quantity) {
    if (stock !== cart?.quantity) {
      dispatch(setQuantity(stock - cart?.quantity));
      Swal.fire({
        title: "Out of Stock!",
        text: "Cannot exceed stock limit!",
        icon: "error",
      });
    }
  }

  return (
    <main className="min-h-screen w-full flex md:flex-row flex-col pt-14 lg:px-10 px-5 pb-10 gap-10">
      <div className="md:flex-[0.5]">
        <figure className="bg-[#f5f5f5] px-10 py-16 flex items-center justify-center">
          <AdvancedImage cldImg={cldImg} />
        </figure>
      </div>
      <div className="md:flex-[0.5] flex flex-col gap-8 text-black">
        <h3 className="text-3xl font-base">{name}</h3>
        <h6 className="text-xl">{rupiah(price)}</h6>
        <p className="text-gray-500">{description}</p>
        <p className="text-gray-500">
          There are {stock} products in stock left.
        </p>
        <hr />
        <div className="flex items-center lg:gap-10 md:gap-4 gap-10">
          <p className="text-gray-500 font-medium">Quantity</p>
          <div
            className={`flex items-center border rounded-full ${
              stock === 0 || stock === cart?.quantity
                ? "bg-gray-400 opacity-50"
                : ""
            }`}
          >
            <button
              onClick={() => dispatch(decrement())}
              className="text-xl font-bold px-3 rounded-l-full py-2 hover:bg-[#e84f69] hover:text-white disabled:bg-gray-400 disabled:text-black"
              disabled={stock === 0 || stock === cart?.quantity}
            >
              &minus;
            </button>
            <input
              type="number"
              className="lg:w-14 md:w-10 w-14 text-center [&::-webkit-inner-spin-button]:appearance-none py-2 focus:outline-none disabled:bg-gray-400"
              value={!quantity ? 1 : quantity}
              onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
              disabled={stock === 0 || stock === cart?.quantity}
            />
            <button
              onClick={() => dispatch(increment())}
              className="text-xl font-bold px-3 rounded-r-full py-2 hover:bg-[#e84f69] hover:text-white disabled:bg-gray-400 disabled:text-black"
              disabled={stock === 0 || stock === cart?.quantity}
            >
              +
            </button>
          </div>
          <button
            onClick={addToCartHandler}
            className="btn bg-[#e84f69] text-white lg:w-36 md:w-28 w-36 hover:bg-rose-800 rounded-full disabled:bg-gray-400 disabled:text-black disabled:opacity-50"
            disabled={stock === 0 || stock === cart?.quantity}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default DetailProductPage;
