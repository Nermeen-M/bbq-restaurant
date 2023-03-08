import { useState } from "react";
import { Link } from "react-router-dom";
import AddUpdateCategoryForm from "./AddUpdateCategoryForm";
import CategoryItemAdmin from "./CategoryItemAdmin";

import { useCategories } from "../state/CategoriesContext";

export default function ManageCategories({ collectionName, setModal }) {
  const { categories } = useCategories();

  const categoriesList = categories.map((item) => (
    <CategoryItemAdmin
      key={item.id}
      item={item}
      collectionName={collectionName}
      setModal={setModal}
    />
  ));

  function addCategoryhandler() {
    setModal(
      <AddUpdateCategoryForm
        collectionName={collectionName}
        formStatus={"add"}
        setModal={setModal}
      />
    );
  }

  return (
    <div>
      <button onClick={addCategoryhandler}>Add category</button>
      <div>{categoriesList}</div>
    </div>
  );
}
