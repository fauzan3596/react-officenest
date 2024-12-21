import React, { useEffect } from "react";
import { WelcomeCard, ItemCard } from "../../components";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/action";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    navigate("/client");
  }, []);

  return (
    <main className="h-screen w-full px-5 pt-5">
      <div className="breadcrumbs text-xl">
        <ul>
          <li>Dashboard</li>
        </ul>
      </div>
      <WelcomeCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <ItemCard />
        <ItemCard type="Books & Stationery" />
        <ItemCard type="Pens & Pencils" />
        <ItemCard type="Paper & Card" />
        <ItemCard type="Notebooks" />
        <ItemCard type="Calendars" />
        <ItemCard type="Office Supplies" />
        <ItemCard type="Stock" />
      </div>
    </main>
  );
}

export default HomePage;
