import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Import RouterProvider and createBrowserRouter
import Layout from "./Layout.jsx";
import Main from "./components/Main/Main";
import Card from "./components/Card/Card";
import Wedding from "./components/Wedding/Wedding";
import GenderCard from "./components/GenderCard/GenderCard";
import Layout2 from "./Layout2.jsx";
import ProductDetailPagePage from "./components/ProductDetailPage/ProductDetailPage.jsx";
import ProductOverviews from "./components/ProductOverviews/ProductOverviews.jsx";
import ParentComponent from "./components/ParentComponent/ParentComponent.jsx";
import AboutPages from "./components/AboutPages/AboutPages.jsx";
import ContactPages from "./components/ContactPages/ContactPages.jsx";
import MarketingFeatures from "./components/MarketingFeatures/MarketingFeatures.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import OrderDetailsForm from "./components/OrderDetailsForm/OrderDetailsForm.jsx";
import WomanClothingCollection from "./components/WomanClothingCollection/WomanClothingCollection.jsx";
import KidsClothingCollection from "./components/KidsClothingCollection/KidsClothingCollection.jsx";
import ManClothingCollection from "./components/ManClothingCollection/ManClothingCollection.jsx";
import ApplicationUISignIn from "./components/ApplicationUISignIn/ApplicationUISignIn.jsx";
import EmployeesUI from "./components/EmployeesUI/EmployeesUI.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import WomanStoarNav from "./components/Header/WomanStoreNev/WomanStoreNav.jsx";
import ManStoreNav from "./components/Header/ManStoreNav/ManStoreNav.jsx";
import KidStoreNav from "./components/Header/KidStoreNav/KidStoreNav.jsx";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/",
        element: <Card />,
      },
      {
        path: "/",
        element: <Wedding />,
      },
      {
        path: "/",
        element: <GenderCard />,
      },

      {
        path: "/",
        element: <OrderDetailsForm />,
      },
      {
        path: "/",
        element: <ProductOverviews />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "ManClothingCollection",
        element: <ManClothingCollection />,
      },
      {
        path: "WomanClothingCollection",
        element: <WomanClothingCollection />,
      },
      {
        path: "KidsClothingCollection",
        element: <KidsClothingCollection />,
      },
      {
        path: "ApplicationUISignIn",
        element: <ApplicationUISignIn />,
      },
      {
        path: "/ProductDetailPagePage",
        element: <ProductDetailPagePage />,
      },
      {
        path: "/ShoppingCart/OrderDetailsForm",
        element: <OrderDetailsForm />,
      },
      {
        path: "/ProductOverviews",
        element: <ProductOverviews />,
      },
      {
        path: "/ShoppingCart/CheckOutPage",
        element: <CheckOutPage />,
      },
      {
        path: "/ParentComponent",
        element: <ParentComponent />,
      },
      {
        path: "WomanStoarNav",
        element: <WomanStoarNav />,
      },
      {
        path: "ManStoreNav",
        element: <ManStoreNav />,
      },
      {
        path: "KidStoreNav",
        element: <KidStoreNav />,
      },
      {
        path: "CreateAccount",
        element: <CreateAccount />,
      },
      {
        path: "EmployeesUI",
        element: <EmployeesUI />,
      },
      {
        path: "ShoppingCart",
        element: <ShoppingCart />,
      },
      {
        path: "AboutPages",
        element: <AboutPages />,
      },
      {
        path: "ContactPages",
        element: <ContactPages />,
      },
      {
        path: "MarketingFeatures",
        element: <MarketingFeatures />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
