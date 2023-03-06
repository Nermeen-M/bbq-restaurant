import useInput from "../scripts/useInput";
import { validateNotEmpty } from "../scripts/validateInputs";

export default function AddCategoryForm() {
  const {
    value: titleValue,
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput(validateNotEmpty);

  const {
    value: descriptionValue,
    valueIsValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput(validateNotEmpty);

  let formIsValid = false;

  if (titleIsValid && descriptionIsValid) {
    formIsValid = true;
  }

  function submitHandler(event) {
    event.preventDefault();
    titleReset();
    descriptionReset();
  }

  return (
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
        {titleHasError && <p className="error">Please enter a valid title.</p>}
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
  );
}
