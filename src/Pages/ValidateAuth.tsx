import { use, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useAuth } from "./Contexts/AuthContexts";
import { useNavigate } from "react-router";

const ValidateAuth = () => {
  const { confirmSignIn } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const init = async () => {
    const authData = window.location.hash;
    if (!authData) return setError("Callback response empty!");
    try {
      const { user, token } = JSON.parse(atob(authData.slice(1))) as {
        user: User;
        token: string;
      };
      confirmSignIn(token, user);
      navigate("/");
    } catch (err) {
      console.error(err);

      return setError("Invalid callback response!");
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      {error ? (
        <div className="px-4 text-rose-700">
          <strong>Error:</strong> {error}{" "}
          <a href="/" className="underline">
            Get Back Home
          </a>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-4">
            <Loader variant="primary" />
          </div>
          <div className="text-xl font-normal">Validating Auth...</div>
        </div>
      )}
    </div>
  );
};

export default ValidateAuth;
