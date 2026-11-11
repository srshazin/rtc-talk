import React from "react";
import Loader from "./Loader";
import { useAuth } from "../Pages/Contexts/AuthContexts";

const AuthLoadingScreen = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <div>
        <div className="flex justify-center mb-4">
          <Loader variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default AuthLoadingScreen;
