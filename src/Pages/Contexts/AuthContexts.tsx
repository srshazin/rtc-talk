import { createContext, useContext, useState, type ReactNode } from "react";
import { API } from "../libs/apiClient";

interface AuthContextStates {
  user: User | null;
  setUser(value: User): void;
  loading: boolean;
  setLoading(value: boolean): void;
  confirmSignIn(token: string, user: User): void;
  authorize(): Promise<void>;
  signOut(onSignOut: () => void): void;
}

const Ctx = createContext<AuthContextStates | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!localStorage.getItem("token"));
  const confirmSignIn = (token: string, user: User) => {
    localStorage.setItem("token", token);
    setUser(user);
  };
  const authorize = async () => {
    const { data, error, errorCode } = await API.get("/auth/authorize");

    if (error) {
      if (errorCode == "UNAUTHORIZED") {
        localStorage.removeItem("token");
      }
      alert(error); // TODO: Replace it with graceful option
      return;
    }
    setUser(data.user);
    setLoading(false);
  };
  const signOut = (onSignOut: () => void) => {
    localStorage.removeItem("token");
    setUser(null);
    onSignOut();
  };
  return (
    <Ctx.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        confirmSignIn,
        authorize,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = (): AuthContextStates => {
  const _ctx = useContext(Ctx);
  if (!_ctx) throw new Error("AuthContext cannot be used outside a provider!");
  return _ctx;
};
