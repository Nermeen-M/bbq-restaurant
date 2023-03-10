import { useParams } from "react-router-dom";
import { useCategories } from "../state/CategoriesContext";

export default function CategoryDetails() {
  const { categories } = useCategories();
  const params = useParams();

  const category = categories.find(
    (item) => item.title.toLowerCase() === params.categoryName.toLowerCase()
  );

  return (
    <div className="banner">
      {/* <img width="100" src={category.image} /> */}
      <div className="text">
        <h1>{category.title}</h1>
        <p>{category.description}</p>
      </div>
    </div>
  );
}
