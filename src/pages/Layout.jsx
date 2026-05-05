import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();

  // Hide layout on auth pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
