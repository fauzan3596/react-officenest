import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/action";
import {
  BrowseByCategories,
  ContactUs,
  Footer,
  Header,
  LatestProducts,
  UpgradeYourWorkspace,
} from "../../components";

const HomePageClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const logOutHandler = () => {
  //   dispatch(logoutUser());
  //   navigate("/client/login");
  // };

  return (
    <main className="min-h-screen w-full">
      <Header />
      <BrowseByCategories />
      <UpgradeYourWorkspace />
      <LatestProducts />
      <ContactUs />
    </main>
  );
};

export default HomePageClient;
