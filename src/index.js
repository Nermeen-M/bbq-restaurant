import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CategoriesProvider } from "./state/CategoriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CategoriesProvider>
  </React.StrictMode>
);
