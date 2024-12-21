import { createSlice } from "@reduxjs/toolkit";
import customer1 from "../assets/customer1.png";
import customer2 from "../assets/customer2.png";
import customer3 from "../assets/customer3.png";

const testimonial = [
  {
    id: 1,
    name: "Finnian Hawke",
    job: "Designer at XYZ Company",
    title: "Exceptional Service and Quality",
    description:
      "We've been working with this team for over a year now, and their commitment to excellence never fails to impress. Their attention to detail and ability to deliver exactly what we need is truly unmatched. Highly recommended",
    imgUrl: customer1,
  },
  {
    id: 2,
    name: "Thorne Blackwood",
    job: "CEO at XYZ Company",
    title: "Reliable and Professional",
    description:
      "From the first consultation to the final delivery, everything was seamless. Their regional office in Bandung made it convenient for us to collaborate. We look forward to continuing this partnership",
    imgUrl: customer2,
  },
  {
    id: 3,
    name: "Lyra Caldwell",
    job: "Product Manager at XYZ Company",
    title: "A True Game-Changer",
    description:
      "The Central Java branch has been instrumental in helping us achieve our business goals. Their innovative approach and dedicated support have made a world of difference. Truly outstanding",
    imgUrl: customer3,
  },
];

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: testimonial,
  reducers: {},
});

export default testimonialSlice.reducer;
