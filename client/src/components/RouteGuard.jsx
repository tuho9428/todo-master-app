import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default RouteGuard;
