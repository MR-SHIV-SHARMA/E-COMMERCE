import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
// import Main from "./components/Main/Main";
// import Card from "./components/Card/Card";
// import Wedding from "./components/Wedding/Wedding";
import Layout2 from "./Layout2.jsx";
// import GenderCard from "./components/GenderCard/GenderCard";
// import ProductDetailPagePage from './components/ProductDetailPage/ProductDetailPage.jsx'
// import ProductOverviews from "./components2/ProductOverviews/ProductOverviews.jsx";
// import ParentComponent from "./components2/ParentComponent/ParentComponent.jsx";
import ShoppingCarts from "./components2/ShoppingCarts/ShoppingCarts.jsx";

import OrderDetailsForm from './components2/OrderDetailsForm/OrderDetailsForm.jsx';
import WomanClothingCollection from "./components/WomanClothingCollection/WomanClothingCollection.jsx";
import KidsClothingCollection from "./components/KidsClothingCollection/KidsClothingCollection.jsx";
import ManClothingCollection from "./components/ManClothingCollection/ManClothingCollection.jsx";

import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <Main />,
      // },
      // {
      //   path: "/",
      //   element: <Card />,
      // },
      // {
      //   path: "/",
      //   element: <Wedding />,
      // },
      // {
      //   path: "/",
      //   element: <GenderCard />,
      // },
      // {
      //   path: "/",
      //   element: <ProductDetailPagePage />,
      // },
      {
        path: "/",
        element: <OrderDetailsForm />,
      },
      // {
      //   path: "/",
      //   element: <ProductOverviews />,
      // },
      // {
      //   path: "/",
      //   element: <ParentComponent />,
      // },
      {
        path: "/",
        element: <ShoppingCarts />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
