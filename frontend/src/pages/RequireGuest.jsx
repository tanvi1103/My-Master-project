import React from "react";
import { Navigate } from "react-router-dom";

const RequireGuest = ({ currentUser, children }) => {
  // If user is logged in, redirect to dashboard or home
  if (currentUser) {
    return <Navigate to="/externalUser" replace />;
  }
  return children;
};

export default RequireGuest;