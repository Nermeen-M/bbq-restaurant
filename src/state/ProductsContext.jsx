import { createContext, useContext, useReducer } from "react";

import categoriesReducer from "./categoriesReducer";

const Context = createContext(null);

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(categoriesReducer, []);

  const value = { products, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProducts() {
  const context = useContext(Context);
  const errorMessage = "To use the products context import it on index.js";

  if (!context) throw new Error(errorMessage);

  return context;
}
