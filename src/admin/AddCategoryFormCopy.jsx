import { useEffect, useState } from "react";

import useInput from "../scripts/useInput";
import { validateNotEmpty } from "../scripts/validateInputs";
import { createDocument } from "../scripts/firebase/fireStore";

import { useCategories } from "../state/CategoriesContext";

export default function AddCategoryForm({
  collectionName,
  formStatus,
  setModal,
  item,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (formStatus === "edit") {
      setForm({
        title: item.title,
        description: item.description,
        image: item.imageURL,
      });
    }
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
    console.log(event.target.value);
  }

  const { dispatch } = useCategories();

  // let formIsValid = false;

  // if (titleIsValid && descriptionIsValid && imageIsValid) {
  //   formIsValid = true;
  // }

  // if (formStatus === "edit") {
  //   setTitle(item.title);
  //   setDescription(item.description);
  //   setImage(item.image);
  // }

  async function submitHandler(event) {
    const data = {
      title: form.title,
      description: form.description,
      imageURL: form.image,
    };

    event.preventDefault();

    const documentId = await createDocument(collectionName, data);
    dispatch({ type: "create", payload: { id: documentId, ...data } });

    // setTitle("");
    // setDescription("");
    // setImage("");
    setModal(null);
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {formStatus == "add" && <h2>Add new category</h2>}
        {formStatus == "edit" && <h2>Edit category</h2>}

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange}
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
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          {/* {descriptionHasError && (
            <p className="error">Please enter a valid description.</p>
          )} */}
        </div>
        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            placeholder="image"
            required
          />
          {/* {imageHasError && (
            <p className="error">Please enter a valid image.</p>
          )} */}
        </div>
        <div className="actions">
          <button
            className="primary-button"
            type="submit"
            // disabled={!formIsValid}
          >
            {formStatus == "add" ? "Add" : "Save"}
          </button>
          <button onClick={() => setModal(null)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
