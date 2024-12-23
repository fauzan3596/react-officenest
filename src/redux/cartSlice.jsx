import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchCartsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartsSuccess: (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    },
    fetchCartsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCartsStart, fetchCartsSuccess, fetchCartsFailure } =
  cartSlice.actions;
export default cartSlice.reducer;
