import { Link } from "react-router-dom";
import { useCategories } from "../state/CategoriesContext";

import CategoryItem from "../components/CategoryItem";

export default function Home() {
  const { categories } = useCategories();

  const categoriesList = categories.map((item) => (
    <CategoryItem key={item.id} item={item} />
  ));

  return (
    <div>
      <div>Hero</div>
      <div>
        {categoriesList}
        <Link to="/menu">View menu</Link>
      </div>
    </div>
  );
}
