import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer, NavbarClient } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts, fetchProducts } from "../../services/fetchApi";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../../redux/productsSlice";
import {
  fetchCartsFailure,
  fetchCartsStart,
  fetchCartsSuccess,
} from "../../redux/cartSlice";

const MainLayoutClient = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { user, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: fetchProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    data: carts,
    isLoading: isCartsLoading,
    isError: isCartsError,
    error: fetchCartsError,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  useEffect(() => {
    dispatch(fetchProductsStart());
    if (isProductsError) {
      dispatch(fetchProductsFailure(fetchProductsError.message));
    } else if (products) {
      dispatch(fetchProductsSuccess(products));
    }
  }, [products, isProductsError, fetchProductsError, dispatch]);

  useEffect(() => {
    dispatch(fetchCartsStart());
    if (isCartsError) {
      dispatch(fetchCartsFailure(fetchCartsError.message));
    } else if (carts) {
      dispatch(fetchCartsSuccess(carts));
    }
  }, [carts, isCartsError, fetchCartsError, dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/client/login");
      } else if (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  }, [navigate, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavbarClient />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayoutClient;
