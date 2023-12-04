import React from "react";
import { Navigate } from "react-router-dom";

 export const PrivateRoute = ({
  element,
  isAuthenticated,
  ...props
}) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated or doesn't have required role
    return <Navigate to="/login" replace />;
  }

  return React.cloneElement(element, props);
};
