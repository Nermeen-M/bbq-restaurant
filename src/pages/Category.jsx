import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useCategories } from "../state/CategoriesContext";
import { useProducts } from "../state/ProductsContext";
import { readDocuments } from "../scripts/firebase/fireStore";
import CategoryDetails from "../components/CategoryDetails";
import ProductItem from "../components/ProductItem";
import LoadingScreen from "../components/shared/LoadingScreen";

// good
export default function Category() {
  const params = useParams();
  const { categories } = useCategories();
  const { products, dispatch } = useProducts();

  const [status, setStatus] = useState("loading");

  const category = categories.find(
    (item) => item.title.toLowerCase() === params.categoryName.toLowerCase()
  );
  const categoryId = category.id;

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
      {status === "loading" && <LoadingScreen />}
      {status === "error" && <p>Error</p>}
      {status === "ready" && (
        <div className="products-list">
          <div className="container">{productsList}</div>
        </div>
      )}
    </main>
  );
}
