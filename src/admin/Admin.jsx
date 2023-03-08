import ManageCategories from "./ManageCategories";

export default function Admin({ setModal }) {
  const collectionName = "categories";

  return (
    <div>
      <ManageCategories collectionName={collectionName} setModal={setModal} />
    </div>
  );
}
