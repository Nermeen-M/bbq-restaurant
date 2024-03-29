import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { validateNotEmpty } from "../scripts/validateInputs";
import {
  createDocumentWithManualId,
  updateDocument,
} from "../scripts/firebase/fireStore";
import { uploadFile, downloadFile } from "../scripts/firebase/cloudStorage";
import { useProducts } from "../state/ProductsContext";
import placeholder from "../assets/images/placeholder.jpg";

export default function AddUpdateProductForm({
  formStatus,
  setModal,
  item,
  categoryId,
}) {
  const { dispatch } = useProducts();

  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const collectionName = `categories/${categoryId}/products`;

  useEffect(() => {
    if (formStatus === "edit") {
      setTitle(item.title);
      setBrief(item.brief);
      setDescription(item.description);
      setPrice(item.price);
      setImage(item.image);
      setIngredients(item.ingredients);
    }
  }, []);

  let formIsValid = false;

  if (
    validateNotEmpty(title) &&
    validateNotEmpty(brief) &&
    validateNotEmpty(description) &&
    validateNotEmpty(price) &&
    validateNotEmpty(ingredients) &&
    image.toString().length !== 0
  ) {
    formIsValid = true;
  }

  const manualId = uuidv4() + "_" + Date.now();

  async function imageChangeHandler(event) {
    setIsUploading(true);
    const file = event.target.files[0];
    const filePath = `products/${manualId}_${file.name}`;

    await uploadFile(file, filePath);
    setImage(await downloadFile(filePath));
    setIsUploading(false);
  }

  async function submitHandler(event) {
    const data = {
      title: title,
      brief: brief,
      description: description,
      price: price,
      image: image,
      ingredients: ingredients,
    };

    event.preventDefault();

    if (formStatus === "add") {
      await createDocumentWithManualId(collectionName, manualId, data);
      dispatch({ type: "create", payload: { id: manualId, ...data } });
    } else if (formStatus === "edit") {
      const updatedItem = {
        ...item,
        title: title,
        brief: brief,
        description: description,
        price: price,
        image: image,
        ingredients: ingredients,
      };
      await updateDocument(collectionName, updatedItem);
      dispatch({ type: "update", payload: updatedItem });
    }

    setTitle("");
    setBrief("");
    setDescription("");
    setPrice("");
    setImage("");
    setIngredients("");
    setModal(null);
  }

  return (
    <div>
      <form className="form admin-form" onSubmit={submitHandler}>
        {formStatus == "add" && <h3>Create new product</h3>}
        {formStatus == "edit" && <h3>Edit product</h3>}

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="brief">Brief</label>
          <input
            id="brief"
            type="text"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            placeholder="Brief"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="ingredients">Recipe</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="Recipe"
            required
          />
        </div>
        <div className="form-field upload">
          <label htmlFor="image">
            <img src={formStatus == "add" && !image ? placeholder : image} />
          </label>
          {isUploading && (
            <div className="spinner">
              <FontAwesomeIcon icon={solid("spinner")} spin />
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={imageChangeHandler}
            className="visually-hidden"
          />
        </div>
        <div className="actions">
          <button
            className="primary-button"
            type="submit"
            disabled={!formIsValid}
          >
            {formStatus == "add" ? "Add" : "Save"}
          </button>
          <button onClick={() => setModal(null)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
