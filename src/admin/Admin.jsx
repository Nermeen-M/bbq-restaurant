import AddCategoryForm from "./AddCategoryForm";

export default function Admin() {
  const collectionName = "categories";

  return (
    <div>
      <AddCategoryForm collectionName={collectionName} />
    </div>
  );
}
