import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import useInput from "../scripts/useInput";
import { validateNotEmpty } from "../scripts/validateInputs";
import {
  createDocumentWithManualId,
  updateDocument,
} from "../scripts/firebase/fireStore";
import { uploadFile, downloadFile } from "../scripts/firebase/cloudStorage";

import { useCategories } from "../state/CategoriesContext";

export default function AddUpdateCategoryForm({
  collectionName,
  formStatus,
  setModal,
  item,
}) {
  const { dispatch } = useCategories();

  // const {
  //   value: titleValue,
  //   valueIsValid: titleIsValid,
  //   hasError: titleHasError,
  //   valueChangeHandler: titleChangeHandler,
  //   inputBlurHandler: titleBlurHandler,
  //   reset: titleReset,
  //   fill: titleFill,
  // } = useInput(validateNotEmpty);

  // const {
  //   value: descriptionValue,
  //   valueIsValid: descriptionIsValid,
  //   hasError: descriptionHasError,
  //   valueChangeHandler: descriptionChangeHandler,
  //   inputBlurHandler: descriptionBlurHandler,
  //   reset: descriptionReset,
  //   fill: descriptionFill,
  // } = useInput(validateNotEmpty);

  // const {
  //   value: imageValue,
  //   valueIsValid: imageIsValid,
  //   hasError: imageHasError,
  //   valueChangeHandler: imageChangeHandler,
  //   inputBlurHandler: imageBlurHandler,
  //   reset: imageReset,
  //   fill: imageFill,
  // } = useInput(validateNotEmpty);
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
      description: description,
      image: image,
    };

    event.preventDefault();

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
      // console.log(data);
      // console.log(updatedItem);
      await updateDocument(collectionName, updatedItem);
      dispatch({ type: "update", payload: updatedItem });
    }

    // titleReset();
    // descriptionReset();
    // imageReset();
    setTitle("");
    setDescription("");
    setImage("");

    setModal(null);
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {formStatus == "add" && <h2>Create new category</h2>}
        {formStatus == "edit" && <h2>Edit category</h2>}

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
