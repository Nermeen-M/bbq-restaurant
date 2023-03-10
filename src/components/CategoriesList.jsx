import { useNavigate } from "react-router-dom";

import { useCategories } from "../state/CategoriesContext";

export default function CategoriesList() {
  const { categories } = useCategories();

  const navigate = useNavigate();

  function clickHandler(item) {
    navigate(`/menu/${item.title}`);
  }

  const categoriesList = categories.map((item) => (
    <div key={item.id} className="category-card">
      <img width="100" src={item.image} />
      <div className="details">
        <div className="text">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            clickHandler(item);
          }}
        >
          View dishes
        </button>
      </div>
    </div>
  ));

  return <div className="container">{categoriesList}</div>;
}
