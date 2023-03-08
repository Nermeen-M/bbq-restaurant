import AddUpdateCategoryForm from "./AddUpdateCategoryForm";
import { deleteDocument } from "../scripts/firebase/fireStore";
import { useCategories } from "../state/CategoriesContext";

export default function CategoryItemAdmin({ item, collectionName, setModal }) {
  const { dispatch } = useCategories();

  const { id, title, imageURL } = item;

  async function editHandler() {
    setModal(
      <AddUpdateCategoryForm
        collectionName={collectionName}
        formStatus={"edit"}
        setModal={setModal}
        item={item}
      />
    );
  }

  async function deleteHandler(id) {
    const message = `Are you sure you want to delete ${title}`;
    const result = window.confirm(message);

    if (!result) return;

    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  return (
    <div>
      <div>
        <img width="100" src={imageURL} />
        <h3>{title}</h3>
        <button onClick={editHandler}>Edit</button>
        <button onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  );
}
