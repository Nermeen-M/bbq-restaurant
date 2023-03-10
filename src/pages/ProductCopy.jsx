import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../state/ProductsContext";
import { useCategories } from "../state/CategoriesContext";

import { readDocument } from "../scripts/firebase/fireStore";

export default function Product() {
  const { categoryName, productId } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { products, dispatch } = useProducts();

  const [status, setStatus] = useState("loading");
  const [currentProduct, setCurrentProduct] = useState({});

  const category = categories.find(
    (item) => item.title.toLowerCase() === categoryName.toLowerCase()
  );
  const categoryId = category.id;

  useEffect(() => {
    loadData(categoryId, productId);
  }, []);

  async function loadData(categoryId, productId) {
    const collectionName = `categories/${categoryId}/products`;
    const data = await readDocument(collectionName, productId).catch(onFail);
    onSuccess(data);
  }
  function onSuccess(data) {
    // dispatch({ type: "initializeArray", payload: data });
    setCurrentProduct(data);
    setStatus("ready");
  }
  function onFail() {
    setStatus("error");
  }

  console.log(products);

  // const product = products.find((item) => item.id === productId);
  return (
    <div id="product">
      <div className="banner">
        <img
          width="100"
          src={currentProduct.image}
          alt={currentProduct.title}
        />
      </div>
      <div className="content">
        <h1>{currentProduct.title}</h1>
        <span>{currentProduct.price}</span>
        <p>{currentProduct.description}</p>

        <h3>Ingredients</h3>
        <div>{currentProduct.ingredients}</div>

        <button
          className="primary-button"
          onClick={() => navigate(`/menu/${categoryName}`)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
