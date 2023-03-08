import { useEffect } from "react";
import useInput from "../scripts/useInput";
import { validateNotEmpty } from "../scripts/validateInputs";
import { createDocument, updateDocument } from "../scripts/firebase/fireStore";

import { useCategories } from "../state/CategoriesContext";

export default function AddUpdateCategoryForm({
  collectionName,
  formStatus,
  setModal,
  item,
}) {
  const { dispatch } = useCategories();

  const {
    value: titleValue,
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset,
    fill: titleFill,
  } = useInput(validateNotEmpty);

  const {
    value: descriptionValue,
    valueIsValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionReset,
    fill: descriptionFill,
  } = useInput(validateNotEmpty);

  const {
    value: imageValue,
    valueIsValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: imageReset,
    fill: imageFill,
  } = useInput(validateNotEmpty);

  useEffect(() => {
    if (formStatus === "edit") {
      titleFill(item.title);
      descriptionFill(item.description);
      imageFill(item.imageURL);
    }
  }, []);

  let formIsValid = false;

  if (titleIsValid && descriptionIsValid && imageIsValid) {
    formIsValid = true;
  }

  async function submitHandler(event) {
    const data = {
      title: titleValue,
      description: descriptionValue,
      imageURL: imageValue,
    };

    event.preventDefault();

    if (formStatus === "add") {
      const documentId = await createDocument(collectionName, data);
      dispatch({ type: "create", payload: { id: documentId, ...data } });
    } else if (formStatus === "edit") {
      const updatedItem = {
        ...item,
        title: titleValue,
        description: descriptionValue,
        imageURL: imageValue,
      };
      // console.log(data);
      // console.log(updatedItem);
      await updateDocument(collectionName, updatedItem);
      dispatch({ type: "update", payload: updatedItem });
    }

    titleReset();
    descriptionReset();
    imageReset();

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
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            placeholder="Title"
          />
          {titleHasError && (
            <p className="error">Please enter a valid title.</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            placeholder="Description"
          />
          {descriptionHasError && (
            <p className="error">Please enter a valid description.</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={imageValue}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}
            placeholder="image"
          />
          {imageHasError && (
            <p className="error">Please enter a valid image.</p>
          )}
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
