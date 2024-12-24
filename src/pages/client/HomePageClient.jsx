import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BrowseByCategories,
  ContactUs,
  Footer,
  Header,
  LatestProducts,
  UpgradeYourWorkspace,
} from "../../components";

const HomePageClient = () => {
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
