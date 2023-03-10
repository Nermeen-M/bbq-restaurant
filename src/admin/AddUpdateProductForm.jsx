import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { validateNotEmpty } from "../scripts/validateInputs";
import {
  createDocumentWithManualId,
  updateDocument,
} from "../scripts/firebase/fireStore";
import { uploadFile, downloadFile } from "../scripts/firebase/cloudStorage";

import { useProducts } from "../state/ProductsContext";

export default function AddUpdateProductForm({
  formStatus,
  setModal,
  item,
  categoryId,
}) {
  // console.log(categoryId);

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

    // setImage({ file: file, filePath: filePath });
    await uploadFile(file, filePath);
    setImage(await downloadFile(filePath));
    // console.log(image.toString());
    setIsUploading(false);
  }

  async function submitHandler(event) {
    // console.log(image);
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
      // console.log(data);
      // console.log(updatedItem);
      await updateDocument(collectionName, updatedItem);
      dispatch({ type: "update", payload: updatedItem });
    }

    // titleReset();
    // descriptionReset();
    // imageReset();
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
      <form className="form" onSubmit={submitHandler}>
        {formStatus == "add" && <h2>Create new product</h2>}
        {formStatus == "edit" && <h2>Edit product</h2>}

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            // onBlur={titleBlurHandler}
            placeholder="Title"
            required
          />
          {/* {titleHasError && (
            <p className="error">Please enter a valid title.</p>
          )} */}
        </div>
        <div className="form-field">
          <label htmlFor="brief">Title</label>
          <input
            id="brief"
            type="text"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            // onBlur={titleBlurHandler}
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
            // onBlur={descriptionBlurHandler}
            placeholder="Description"
            required
          />
          {/* {descriptionHasError && (
            <p className="error">Please enter a valid description.</p>
          )} */}
        </div>
        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            // onBlur={titleBlurHandler}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image</label>
          {isUploading && <span>Uploading ...</span>}
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            // value={image}
            // files={image}
            onChange={imageChangeHandler}
            // onBlur={imageBlurHandler}
          />
          {/* {formStatus === "edit" && <img width="50" src={item.image} />} */}
          <img width="50" src={image} />
          {/* {imageHasError && (
            <p className="error">Please enter a valid image.</p>
          )} */}
        </div>
        <div className="form-field">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            // onBlur={titleBlurHandler}
            placeholder="Ingredients"
            required
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
