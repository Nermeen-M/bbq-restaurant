import AddCategoryForm from "./AddCategoryForm";
import CategoryItemAdmin from "./CategoryItemAdmin";

export default function ManageCategories({ data, collectionName }) {
  const categoriesList = data.map((item) => (
    <CategoryItemAdmin key={item.id} item={item} />
  ));

  return (
    <div>
      <AddCategoryForm collectionName={collectionName} />
      <div>{categoriesList}</div>
    </div>
  );
}
