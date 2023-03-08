import useInput from "../scripts/useInput";
import { validateNotEmpty } from "../scripts/validateInputs";
import { createDocument } from "../scripts/firebase/fireStore";

import { useCategories } from "../state/CategoriesContext";
import CategoryItemAdmin from "./CategoryItemAdmin";

export default function AddCategoryForm({ collectionName }) {
  const { categories, dispatch } = useCategories();

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

  const categoriesList = categories.map((item) => (
    <CategoryItemAdmin
      key={item.id}
      item={item}
      collectionName={collectionName}
      fillInputs={fillInputs}
    />
  ));

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

    const documentId = await createDocument(collectionName, data);
    dispatch({ type: "create", payload: { id: documentId, ...data } });

    titleReset();
    descriptionReset();
    imageReset();
  }

  function fillInputs(item) {
    titleFill(item.title);
    descriptionFill(item.description);
    imageFill(item.imageURL);
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h2>Create new category</h2>
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
            Submit
          </button>
        </div>
      </form>
      <div>{categoriesList}</div>
    </div>
  );
}
