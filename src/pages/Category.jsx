import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useCategories } from "../state/CategoriesContext";
import { useProducts } from "../state/ProductsContext";
import { readDocuments } from "../scripts/firebase/fireStore";

import CategoryDetails from "../components/CategoryDetails";
import ProductItem from "../components/ProductItem";

export default function Category() {
  const { categories } = useCategories();
  const params = useParams();
  const { products, dispatch } = useProducts();

  const [status, setStatus] = useState("loading");

  const category = categories.find(
    (item) => item.title.toLowerCase() === params.categoryName.toLowerCase()
  );

  const categoryId = category.id;

  //   const collectionName = `categories/${categoryId}/products`;

  useEffect(() => {
    loadData(categoryId);
  }, []);

  async function loadData(categoryId) {
    const collectionName = `categories/${categoryId}/products`;
    const data = await readDocuments(collectionName).catch(onFail);
    onSuccess(data);
  }
  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus("ready");
  }
  function onFail() {
    setStatus("error");
  }

  const productsList = products.map((item) => (
    <ProductItem key={item.id} item={item} />
  ));

  return (
    <main id="category">
      <CategoryDetails />
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error</p>}
      {status === "ready" && (
        <div className="products-list">
          <div className="container">{productsList}</div>
        </div>
      )}
    </main>
  );
}
