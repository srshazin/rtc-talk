import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Login";
import ValidateAuth from "./ValidateAuth";
import { useAuth } from "./Contexts/AuthContexts";
import AuthLoadingScreen from "../Components/AuthLoadingScreen";
import Home from "./User/Home";

const Root = () => {
  const { loading, user, authorize } = useAuth();
  useEffect(() => {
    if (loading) {
      authorize();
    }
  }, []);
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: user ? <Home /> : <Login />,
      },
      {
        path: "/auth/validate",
        element: <ValidateAuth />,
      },
    ],
    {},
  );

  if (loading) {
    return <AuthLoadingScreen />;
  }
  return <RouterProvider router={router} />;
};

export default Root;
