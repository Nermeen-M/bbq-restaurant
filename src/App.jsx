import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { readDocuments } from "./scripts/firebase/fireStore";
import { useCategories } from "./state/CategoriesContext";

import Home from "./pages/Home";
import Admin from "./admin/Admin";

export default function App() {
  const { dispatch } = useCategories();

  const [status, setStatus] = useState("loading");
  // const [loadedData, setLoadedData] = useState();

  const collectionName = "categories";

  useEffect(() => {
    loadData(collectionName);
  }, []);

  async function loadData(collectionName) {
    const data = await readDocuments(collectionName).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    // setLoadedData(data);
    dispatch({ type: "initializeArray", payload: data });
    setStatus("ready");
  }

  function onFail() {
    setStatus("error");
  }

  return (
    <div className="App">
      <h1>Fire grill</h1>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {status === "ready" && (
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/menu" element={<p>Menu</p>} />
            <Route path="/menu/:categoryName" element={<p>Category</p>} />
            <Route
              path="/menu/:categoryName/:productId"
              element={<p>Product</p>}
            />
            <Route path="/contact" element={<p>Contact</p>} />
            <Route
              path="/admin"
              element={<Admin collectionName={collectionName} />}
              exact
            />
          </Routes>
        )}
        {status === "error" && <p>Error</p>}
      </div>
    </div>
  );
}
