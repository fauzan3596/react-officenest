import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { checkoutCarts, deleteCart, fetchCarts } from "../../services/fetchApi";
import { CartCard, LoadingSpinner } from "../../components";
import Swal from "sweetalert2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    data: carts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: checkoutCarts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  if (isError) {
    return Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }

  const checkoutHandler = () => {
    if (carts.length < 1) {
      Swal.fire({
        title: "Empty carts",
        icon: "info",
        text: "Please add one or more products to your cart first",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout?",
      text: "Are you sure you want to checkout all the products?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, checkout!",
      cancelButtonText: "No, continue shopping",
    }).then(async (result) => {
      if (result.isConfirmed) {
        carts?.forEach((cart) => {
          deleteMutation.mutate(cart);
        });
      }
    });
  };

  const totalItems = carts?.reduce((total, cart) => {
    return total + cart.quantity;
  }, 0);

  const totalPrice = carts?.reduce((total, cart) => {
    return total + cart.quantity * cart.price;
  }, 0);

  const shipping = carts.length > 0 && 15000;
  const totalWithoutTax = totalPrice + shipping;
  const totalWithTax = totalWithoutTax + totalPrice * 0.1;
  const tax = totalWithTax - totalWithoutTax;

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <main className="min-h-screen w-full flex lg:flex-row flex-col pt-14 lg:px-10 px-5 pb-10 gap-10">
      <div className="flex-[0.7]">
        <div className="border">
          <h1 className="font-bold text-2xl px-5 py-3">SHOPPING CART</h1>
          <hr />
          <div className="grid grid-cols-1 gap-y-5 p-5">
            {carts?.length === 0 && (
              <p className="text-gray-500">
                There are no more products in your cart
              </p>
            )}
            {carts?.map((cart) => (
              <CartCard key={cart.id} cart={cart} />
            ))}
          </div>
        </div>
        <Link
          to="/client/shop"
          className="btn mt-5 btn-outline hover:bg-secondary hover:border-0 rounded-badge"
        >
          <MdKeyboardArrowLeft className="text-xl" /> Continue Shopping
        </Link>
      </div>
      <div className="flex-[0.3]">
        <div className="border">
          <div className="flex px-5 py-3 flex-col text-gray-500 gap-3">
            <div className="flex justify-between">
              <p>{totalItems} products</p>
              <p>{rupiah(totalPrice)}</p>
            </div>
            <div
              className={`flex justify-between ${carts.length < 1 && "hidden"}`}
            >
              <p>Shipping</p>
              <p>{rupiah(shipping)}</p>
            </div>
            <div className="flex justify-between mt-8">
              <p>Total (tax excl.)</p>
              <p>{rupiah(totalWithoutTax)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total (tax incl.)</p>
              <p>{rupiah(totalWithTax)}</p>
            </div>
            <div className="flex justify-between">
              <p>Taxes:</p>
              <p>{rupiah(tax)}</p>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="btn btn-wide rounded-none bg-[#e84f69] text-white hover:bg-rose-800"
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
