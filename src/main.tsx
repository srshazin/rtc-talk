import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Pages/Root";
import { AuthProvider } from "./Contexts/AuthContexts";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Root />
  </AuthProvider>,
);
