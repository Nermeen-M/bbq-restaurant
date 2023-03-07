import ManageCategories from "./ManageCategories";

export default function Admin({ collectionName }) {
  return (
    <div>
      <ManageCategories collectionName={collectionName} />
    </div>
  );
}
