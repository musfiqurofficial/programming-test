import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import DataProvider from "./Context/DataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} fallbackElement={<App />} />
    </DataProvider>
  </React.StrictMode>
);
