import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Wedding from "./components/Wedding/Wedding";
import GenderCard from "./components/GenderCard/GenderCard";
import AboutPages from "./components/AboutPages/AboutPages";
import MarketingFeatures from "./components/MarketingFeatures/MarketingFeatures";
import Footer from "./components/Footer/Footer";
import HomeProduct from "./components/HomeProduct/HomeProduct";

function Layout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {isHomePage && (
        <>
          <HomeProduct />
          <Wedding />
          <GenderCard />
          <AboutPages />
          <MarketingFeatures />
        </>
      )}
      <Footer />
    </>
  );
}

export default Layout;
