import { useParams } from "react-router-dom";
import { useCategories } from "../state/CategoriesContext";

export default function CategoryDetails() {
  const { categories } = useCategories();
  const params = useParams();

  const category = categories.find(
    (item) => item.title.toLowerCase() === params.categoryName.toLowerCase()
  );

  return (
    <div className="category-details">
      <img width="100" src={category.image} />
      <div className="container">
        <h2>{category.title}</h2>
        <p>{category.description}</p>
      </div>
    </div>
  );
}
