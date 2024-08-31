import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import Wedding from "./components/Wedding/Wedding";
import GenderCard from "./components/GenderCard/GenderCard";
import AboutPages from "./components/AboutPages/AboutPages";
import MarketingFeatures from "./components/MarketingFeatures/MarketingFeatures";
import Footer from "./components/Footer/Footer";

function Layout() {
  const location = useLocation();

  // Check if the current path is the homepage
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>
        <Outlet />{" "}
        {/* This renders the specific component for the current route */}
      </main>
      {/* Conditionally render components only on the homepage */}
      {isHomePage && (
        <>
          <Card />
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
