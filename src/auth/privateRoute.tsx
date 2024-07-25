/**
 * This is a private route that protects the pages that 
 * require authentication.
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}


const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { email } = useAuth();

  if (!email) {
      return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;