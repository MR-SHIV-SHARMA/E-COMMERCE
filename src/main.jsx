import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./stores";
import "./index.css";
import Layout from "./Layout.jsx";
import Main from "./components/Main/Main";
import Card from "./components/Card/Card";
import Wedding from "./components/Wedding/Wedding";
import GenderCard from "./components/GenderCard/GenderCard";
import ProductDetailPagePage from "./components/ProductDetailPage/ProductDetailPage.jsx";
import ProductOverviews from "./components/ProductOverviews/ProductOverviews.jsx";
import ParentComponent from "./components/ParentComponent/ParentComponent.jsx";
import AboutPages from "./components/AboutPages/AboutPages.jsx";
import ContactPages from "./components/ContactPages/ContactPages.jsx";
import MarketingFeatures from "./components/MarketingFeatures/MarketingFeatures.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import OrderDetailsForm from "./components/OrderDetailsForm/OrderDetailsForm.jsx";
import Woman from "./components/Woman/WomanClothingCollection.jsx";
import Kids from "./components/Kids/KidsClothingCollection.jsx";
import Man from "./components/Man/ManClothingCollection.jsx";
import ApplicationUISignIn from "./components/ApplicationUISignIn/ApplicationUISignIn.jsx";
import EmployeesUI from "./components/EmployeesUI/EmployeesUI.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import WomanStoarNav from "./components/Header/WomanStoreNev/WomanStoreNav.jsx";
import ManStoreNav from "./components/Header/ManStoreNav/ManStoreNav.jsx";
import KidStoreNav from "./components/Header/KidStoreNav/KidStoreNav.jsx";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage.jsx";
import Search from "./components/Search/Search.jsx";

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
        path: "/ProductOverviews/:id",
        element: <ProductOverviews />,
      },
      {
        path: "/Man",
        element: <Man />,
      },
      {
        path: "/Woman",
        element: <Woman />,
      },
      {
        path: "/Kids",
        element: <Kids />,
      },
      {
        path: "/ApplicationUISignIn",
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
        path: "/search",
        element: <Search />,
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
        path: "/WomanStoarNav",
        element: <WomanStoarNav />,
      },
      {
        path: "/ManStoreNav",
        element: <ManStoreNav />,
      },
      {
        path: "/KidStoreNav",
        element: <KidStoreNav />,
      },
      {
        path: "/CreateAccount",
        element: <CreateAccount />,
      },
      {
        path: "/EmployeesUI",
        element: <EmployeesUI />,
      },
      {
        path: "/ShoppingCart",
        element: <ShoppingCart />,
      },
      {
        path: "/AboutPages",
        element: <AboutPages />,
      },
      {
        path: "/ContactPages",
        element: <ContactPages />,
      },
      {
        path: "/MarketingFeatures",
        element: <MarketingFeatures />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
