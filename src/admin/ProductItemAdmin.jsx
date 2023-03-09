import AddUpdateProductForm from "./AddUpdateProductForm";
import { deleteDocument } from "../scripts/firebase/fireStore";
import { useProducts } from "../state/ProductsContext";

export default function ProductItemAdmin({ item, categoryId, setModal }) {
  const { dispatch } = useProducts();

  const { id, title, image } = item;

  const collectionName = `categories/${categoryId}/products`;

  async function editHandler() {
    setModal(
      <AddUpdateProductForm
        formStatus={"edit"}
        setModal={setModal}
        item={item}
        categoryId={categoryId}
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
        <img width="100" src={image} />
        <h3>{title}</h3>
        <button onClick={editHandler}>Edit</button>
        <button onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  );
}
