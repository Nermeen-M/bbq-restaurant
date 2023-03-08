import { updateDocument, deleteDocument } from "../scripts/firebase/fireStore";
import { useCategories } from "../state/CategoriesContext";

export default function CategoryItemAdmin({
  item,
  collectionName,
  fillInputs,
}) {
  const { dispatch } = useCategories();

  const { title, imageURL } = item;

  async function editHandler() {
    fillInputs(item);
  }

  function deleteHandler() {}

  return (
    <div>
      <div>
        <img width="100" src={imageURL} />
        <h3>{title}</h3>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}
