import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { InsuranceProvider } from "./context/InsuranceProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <InsuranceProvider>
        <App />
      </InsuranceProvider>
    </BrowserRouter>
  </StrictMode>
);
