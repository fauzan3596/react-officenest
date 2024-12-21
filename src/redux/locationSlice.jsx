import { createSlice } from "@reduxjs/toolkit";
import location1 from "../assets/location1.png";
import location2 from "../assets/location2.png";
import location3 from "../assets/location3.png";
import location4 from "../assets/location4.png";

const location = [
  {
    id: 1,
    name: "Headquarters",
    place: "Jakarta Timur, Jakarta",
    imgUrl: location1,
  },
  {
    id: 2,
    name: "Regional Office",
    place: "Bandung, West Java",
    imgUrl: location2,
  },
  {
    id: 3,
    name: "Central Java Branch",
    place: "Semarang, Central Java",
    imgUrl: location3,
  },
  {
    id: 4,
    name: "East Java Branch",
    place: "Surabaya, East Java",
    imgUrl: location4,
  },
];

const locationSlice = createSlice({
  name: "locations",
  initialState: location,
  reducers: {},
});

export default locationSlice.reducer;
