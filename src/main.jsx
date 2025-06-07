import React from "react";
import { useState, useEffect } from "react";
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
import CartTab from "./components/cartTab.jsx";
import {
  ScrollToTop,
  ErrorBoundary,
  ToastContainer,
} from "./components/ScrollToTop/ScrollToTop.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SuperAdminLayout from "./components/SuperAdminLayout/SuperAdminLayout.jsx";
import SuperAdminDashboard from "./components/SuperAdminDashboard/SuperAdminDashboard.jsx";
import SuperAdminLogin from "./components/SuperAdminLogin/SuperAdminLogin.jsx";
// import SuperAdminRegister from "./components/SuperAdminRegister/SuperAdminRegister.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/", element: <Card /> },
      { path: "/", element: <Wedding /> },
      { path: "/", element: <GenderCard /> },
      { path: "/cartTab", element: <CartTab /> },
      { path: "/", element: <OrderDetailsForm /> },
      { path: "/ProductOverviews/:id", element: <ProductOverviews /> },
      { path: "/Man", element: <Man /> },
      { path: "/Woman", element: <Woman /> },
      { path: "/Kids", element: <Kids /> },
      { path: "/ApplicationUISignIn", element: <ApplicationUISignIn /> },
      { path: "/ProductDetailPagePage", element: <ProductDetailPagePage /> },
      { path: "/cartTab/OrderDetailsForm", element: <OrderDetailsForm /> },
      { path: "/ProductOverviews", element: <ProductOverviews /> },
      { path: "/search", element: <Search /> },
      { path: "/cartTab/CheckOutPage", element: <CheckOutPage /> },
      { path: "/ParentComponent", element: <ParentComponent /> },
      { path: "/WomanStoarNav", element: <WomanStoarNav /> },
      { path: "/ManStoreNav", element: <ManStoreNav /> },
      { path: "/KidStoreNav", element: <KidStoreNav /> },
      { path: "/CreateAccount", element: <CreateAccount /> },
      { path: "/EmployeesUI", element: <EmployeesUI /> },
      { path: "/ShoppingCart", element: <ShoppingCart /> },
      { path: "/AboutPages", element: <AboutPages /> },
      { path: "/ContactPages", element: <ContactPages /> },
      { path: "/MarketingFeatures", element: <MarketingFeatures /> },
    ],
  },
  // 🔐 Admin Routes
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children: [
  //     { index: true, element: <AdminDashboard /> },
  //     { path: "users", element: <AdminUsersPage /> },
  //     { path: "orders", element: <AdminOrdersPage /> },
  //     // Add more admin routes
  //   ],
  // },

  // 🔐 Super Admin Routes
  {
    path: "/admin",
    element: <SuperAdminLogin />,
  },

  {
    path: "/super-admin/super-admin-dashboard",
    element: <SuperAdminLayout />,
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      // { path: "manage-admins", element: <ManageAdmins /> },
      // { path: "create-super-admin", element: <CreateSuperAdmin /> },
      // { path: "delete-super-admin", element: <DeleteSuperAdmin /> },
      // { path: "create-admin", element: <CreateAdmin /> },
      // { path: "delete-admin", element: <DeleteAdmin /> },
    ],
  },

  // 🔐 Merchant Routes
  // {
  //   path: "/merchant",
  //   element: <MerchantLayout />,
  //   children: [
  //     { index: true, element: <MerchantDashboard /> },
  //     { path: "products", element: <MerchantProducts /> },
  //     { path: "orders", element: <MerchantOrders /> },
  //     // Add more merchant routes
  //   ],
  // },
]);

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the duration as needed
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return loading ? (
    <div className="flex justify-center items-center w-full h-screen overflow-hidden">
      <DotLottieReact
        className="w-full h-full"
        src="https://lottie.host/9b9efbc5-33e3-4517-a667-7ab567527149/CIXRyyRQRI.lottie"
        loop
        autoplay
      />
    </div>
  ) : (
    <Provider store={store}>
      <RouterProvider router={router}>
        <ErrorBoundary>
          <ScrollToTop />
          <ToastContainer />
        </ErrorBoundary>
      </RouterProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
