import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true" ||
    sessionStorage.getItem("isAdminLoggedIn") === "true";
  console.log("ProtectedRoute isLoggedIn:", {
    isLoggedIn,
    localStorage: localStorage.getItem("isAdminLoggedIn"),
    sessionStorage: sessionStorage.getItem("isAdminLoggedIn"),
  });
  return isLoggedIn ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;