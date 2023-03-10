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
import { useCategories } from "../state/CategoriesContext";
import placeholder from "../assets/images/placeholder.jpg";

export default function AddUpdateCategoryForm({
  collectionName,
  formStatus,
  setModal,
  item,
}) {
  const { dispatch } = useCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (formStatus === "edit") {
      setTitle(item.title);
      setDescription(item.description);
      setImage(item.image);
    }
  }, []);

  let formIsValid = false;

  if (
    validateNotEmpty(title) &&
    validateNotEmpty(description) &&
    image.toString().length !== 0
  ) {
    formIsValid = true;
  }

  const manualId = uuidv4() + "_" + Date.now();

  async function imageChangeHandler(event) {
    setIsUploading(true);
    const file = event.target.files[0];
    const filePath = `categories/${manualId}_${file.name}`;

    await uploadFile(file, filePath);
    setImage(await downloadFile(filePath));
    setIsUploading(false);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
      image: image,
    };

    if (formStatus === "add") {
      await createDocumentWithManualId(collectionName, manualId, data);
      dispatch({ type: "create", payload: { id: manualId, ...data } });
    } else if (formStatus === "edit") {
      const updatedItem = {
        ...item,
        title: title,
        description: description,
        image: image,
      };
      await updateDocument(collectionName, updatedItem);
      dispatch({ type: "update", payload: updatedItem });
    }

    setTitle("");
    setDescription("");
    setImage("");
    setModal(null);
  }

  return (
    <div>
      <form className="form admin-form" onSubmit={submitHandler}>
        {formStatus == "add" && <h3>Create new category</h3>}
        {formStatus == "edit" && <h3>Edit category</h3>}

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
