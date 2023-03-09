import { useState, useEffect } from "react";

import { useCategories } from "../state/CategoriesContext";
import { useProducts } from "../state/ProductsContext";

import { readDocuments } from "../scripts/firebase/fireStore";

import AddUpdateProductForm from "./AddUpdateProductForm";
import ProductItemAdmin from "./ProductItemAdmin";

export default function ManageProducts({ setModal }) {
  const { categories } = useCategories();
  const { products, dispatch } = useProducts();

  const [status, setStatus] = useState("loading");

  const [selectedOption, setSelectedOption] = useState(categories[0].id);

  const selectOptions = categories.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  useEffect(() => {
    loadData(selectedOption);
  }, [selectedOption]);

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

  //   function selectChangeHandler(event) {
  //     setSelectedOption(event.target.value);
  //     // loadData(event.target.value);
  //   }

  const productsList = products.map((item) => (
    <ProductItemAdmin
      key={item.id}
      item={item}
      categoryId={selectedOption}
      setModal={setModal}
    />
  ));
  //   console.log(selectedOption);
  function addProductHandler() {
    setModal(
      <AddUpdateProductForm
        formStatus={"add"}
        setModal={setModal}
        categoryId={selectedOption}
      />
    );
  }

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error</p>}
      {status === "ready" && productsList}
      <h2>Manage products</h2>
      <label>
        Select a category
        <select
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          {selectOptions}
        </select>
      </label>

      <button onClick={addProductHandler}>Add product</button>
    </div>
  );
}
