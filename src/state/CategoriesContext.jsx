import { createContext, useContext, useReducer } from "react";

import categoriesReducer from "./categoriesReducer";

const Context = createContext(null);

export function CategoriesProvider({ children }) {
  const [categories, dispatch] = useReducer(categoriesReducer, []);

  const value = { categories, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCategories() {
  const context = useContext(Context);
  const errorMessage = "To use The Categories Context import it on index.js";

  if (!context) throw new Error(errorMessage);

  return context;
}
