import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productsSlice";
import userSlice from "./userSlice";
import locationSlice from "./locationSlice";
import categorySlice from "./categorySlice";
import testimonialSlice from "./testimonialSlice";
import quantitySlice from "./quantitySlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice,
    locations: locationSlice,
    categories: categorySlice,
    testimonials: testimonialSlice,
    quantity: quantitySlice,
  },
});

export default store;
