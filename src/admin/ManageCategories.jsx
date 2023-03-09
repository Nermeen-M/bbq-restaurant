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
    <div>
      <h2>Manage Categories</h2>
      <button onClick={addCategoryHandler}>Add category</button>
      <div>{categoriesList}</div>
    </div>
  );
}
