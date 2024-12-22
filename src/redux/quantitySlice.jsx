import { createSlice } from "@reduxjs/toolkit";

const quantitySlice = createSlice({
  name: "quantity",
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      if (state.value > 1) state.value--;
    },
    setQuantity: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
