import React from "react";
// import Header from "./components/Header/Header";
// import { Outlet } from "react-router-dom";
// import Main from "./components/Main/Main";
// import Card from "./components/Card/Card";
// import Wedding from "./components/Wedding/Wedding";
// import GenderCard from "./components/GenderCard/GenderCard";
// import Footer from "./components/Footer/Footer";
import ProductDetailPagePage from './components/ProductDetailPage/ProductDetailPage'
import OrderDetailsForm from './components2/OrderDetailsForm/OrderDetailsForm';
// import ProductOverviews from "./components2/ProductOverviews/ProductOverviews";
import ParentComponent from './components2/ParentComponent/ParentComponent'

function Layout() {
  return (
    <>
      {/* <Header />
      <Main />
      <Card />
      <Wedding />
      <GenderCard />
      <Footer /> */}
      <ProductDetailPagePage />
      <OrderDetailsForm />
      {/* <ProductOverviews /> */}
      <ParentComponent />
    </>
  );
}

export default Layout;
