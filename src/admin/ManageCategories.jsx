import AddUpdateCategoryForm from "./AddUpdateCategoryForm";
import CategoryItemAdmin from "./CategoryItemAdmin";

import { useCategories } from "../state/CategoriesContext";

export default function ManageCategories({ collectionName, setModal }) {
  const { categories } = useCategories();

  //   console.log(categories);
  const categoriesList = categories.map((item) => (
    <CategoryItemAdmin
      key={item.id}
      item={item}
      collectionName={collectionName}
      setModal={setModal}
    />
  ));

  function addCategoryHandler() {
    setModal(
      <AddUpdateCategoryForm
        collectionName={collectionName}
        formStatus={"add"}
        setModal={setModal}
      />
    );
  }

  return (
    <div className="admin-board">
      <h1>Manage Categories</h1>
      <button onClick={addCategoryHandler} className="primary-button">
        Add category
      </button>
      <div className="listing">{categoriesList}</div>
    </div>
  );
}
