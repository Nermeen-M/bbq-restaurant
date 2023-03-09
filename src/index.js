import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CategoriesProvider } from "./state/CategoriesContext";
import { ProductsProvider } from "./state/ProductsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <ProductsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductsProvider>
    </CategoriesProvider>
  </React.StrictMode>
);
