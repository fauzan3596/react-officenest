import { createBrowserRouter } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  HomePage,
  ErrorPage,
  MasterDataPage,
  AddDataPage,
  EditDataPage,
  RegisterPageClient,
  LoginPageClient,
  HomePageClient,
  AboutPage,
  ContactPage,
  ShopPage,
  DetailProductPage,
  CartPage,
  SearchPage,
} from "../pages/";
import { MainLayout, MainLayoutClient } from "../layouts";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/data",
        element: <MasterDataPage />,
      },
      {
        path: "/add",
        element: <AddDataPage />,
      },
      {
        path: "/edit/:id",
        element: <EditDataPage />,
      },
    ],
  },
  {
    path: "/client/register",
    element: <RegisterPageClient />,
  },
  {
    path: "/client/login",
    element: <LoginPageClient />,
  },
  {
    path: "/client",
    element: <MainLayoutClient />,
    children: [
      {
        path: "/client",
        element: <HomePageClient />,
      },
      {
        path: "/client/about",
        element: <AboutPage />,
      },
      {
        path: "/client/contact",
        element: <ContactPage />,
      },
      {
        path: "/client/shop",
        element: <ShopPage />,
      },
      {
        path: "/client/detail/:id",
        element: <DetailProductPage />
      },
      {
        path: "/client/cart",
        element: <CartPage />
      },
      {
        path: "/client/search/:query",
        element: <SearchPage />
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
