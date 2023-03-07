import AddCategoryForm from "./AddCategoryForm";
import CategoryItemAdmin from "./CategoryItemAdmin";

import { useCategories } from "../state/CategoriesContext";

export default function ManageCategories({ collectionName }) {
  const { categories } = useCategories();

  const categoriesList = categories.map((item) => (
    <CategoryItemAdmin
      key={item.id}
      item={item}
      collectionName={collectionName}
    />
  ));

  return (
    <div>
      <AddCategoryForm collectionName={collectionName} />
      <div>{categoriesList}</div>
    </div>
  );
}
