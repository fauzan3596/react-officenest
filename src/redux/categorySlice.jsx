import { createSlice } from "@reduxjs/toolkit";
import category1 from "../assets/category1.jpg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";
import category4 from "../assets/category4.jpg";
import category5 from "../assets/category5.jpg";
import category6 from "../assets/category6.jpg";

const category = [
  {
    id: 1,
    name: "Books & Stationery",
    imgUrl: category1,
  },
  {
    id: 2,
    name: "Pens & Pencils",
    imgUrl: category2,
  },
  {
    id: 3,
    name: "Paper & Card",
    imgUrl: category3,
  },
  {
    id: 4,
    name: "Notebooks",
    imgUrl: category4,
  },
  {
    id: 5,
    name: "Calendars",
    imgUrl: category5,
  },
  {
    id: 6,
    name: "Office Supplies",
    imgUrl: category6,
  },
];

const categorySlice = createSlice({
  name: "categories",
  initialState: category,
  reducers: {},
});

export default categorySlice.reducer;
