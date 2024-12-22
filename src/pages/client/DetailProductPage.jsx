import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addProductToCart, fetchProductById } from "../../services/fetchApi";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { LoadingSpinner } from "../../components";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, setQuantity } from "../../redux/quantitySlice";

const DetailProductPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { value: quantity } = useSelector((state) => state.quantity);

  const addMutation = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });

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

  if (quantity > stock) {
    dispatch(setQuantity(stock));
    Swal.fire({
      title: "Out of Stock!",
      text: "Cannot exceed stock limit!",
      icon: "error",
    });
  }

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

  const addToCartHandler = () => {
    const productCart = { ...product, quantity: quantity };
    addMutation.mutate(productCart);
  };

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
          <div className="flex items-center border rounded-full">
            <button
              onClick={() => dispatch(decrement())}
              className="text-xl font-bold px-3 rounded-l-full py-2 hover:bg-[#e84f69] hover:text-white"
            >
              &minus;
            </button>
            <input
              type="number"
              className="lg:w-14 md:w-10 w-14 text-center [&::-webkit-inner-spin-button]:appearance-none py-2 focus:outline-none"
              value={!quantity ? 1 : quantity}
              onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
            />
            <button
              onClick={() => dispatch(increment())}
              className="text-xl font-bold px-3 rounded-r-full py-2 hover:bg-[#e84f69] hover:text-white"
            >
              +
            </button>
          </div>
          <button
            onClick={addToCartHandler}
            className="btn bg-[#e84f69] text-white lg:w-36 md:w-28 w-36 hover:bg-rose-800 rounded-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default DetailProductPage;
