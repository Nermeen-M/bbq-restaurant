import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { readDocuments } from "./scripts/firebase/fireStore";
import { useCategories } from "./state/CategoriesContext";

import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Footer from "./components/shared/Footer";
import Admin from "./pages/Admin";
import Modal from "./components/shared/Modal";

import AddCategoryForm from "./admin/AddUpdateCategoryForm";

import "./assets/styles/style.scss";

export default function App() {
  const { dispatch } = useCategories();

  const [status, setStatus] = useState("loading");
  const [modal, setModal] = useState(null);
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
      <Header />
      {status === "loading" && <p>Loading...</p>}
      {status === "ready" && (
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:categoryName" element={<Category />} />
          <Route path="/menu/:categoryName/:productId" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin setModal={setModal} />} exact />
          {/* <Route
              path="/admin/add-update-category"
              element={<AddCategoryForm collectionName={collectionName} />}
            /> */}
        </Routes>
      )}
      {status === "error" && <p>Error</p>}
      <Footer />
      <Modal modalState={[modal, setModal]} />
    </div>
  );
}
