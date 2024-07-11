import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./context/appContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
