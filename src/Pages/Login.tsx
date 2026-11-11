import React from "react";
import { IoVideocam } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { API_ORIGIN } from "./libs/apiClient";

const Login = () => {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="login-container">
        <div className="flex justify-center">
          <IoVideocam fontSize={35} />
        </div>
        <div className="text-3xl font-black text-center mt-4">RTC Talk</div>

        <button
          onClick={() => window.location.assign(`${API_ORIGIN}/auth/url`)}
          className="btn btn-pill flex items-center justify-center w-full mt-8"
          style={{ padding: "1.5rem 1rem" }}
        >
          <FaGoogle /> <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
