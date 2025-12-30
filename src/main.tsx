import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { KeycloakProvider } from "./contexts/KeycloakContext";

createRoot(document.getElementById("root")!).render(
  <KeycloakProvider>
    <App />
  </KeycloakProvider>
);