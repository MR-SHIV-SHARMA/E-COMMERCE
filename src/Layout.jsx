import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Card from "./components/Card/Card";
import Wedding from "./components/Wedding/Wedding";
import GenderCard from "./components/GenderCard/GenderCard";
import AboutPages from "./components/AboutPages/AboutPages";
import MarketingFeatures from "./components/MarketingFeatures/MarketingFeatures";
import Footer from "./components/Footer/Footer";
import ParentComponent from "./components/ParentComponent/ParentComponent";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Card />
      <Wedding />
      <GenderCard />
      <AboutPages />
      <MarketingFeatures />
      <Footer />
      <ParentComponent />
    </>
  );
}

export default Layout;
