import { Link } from "react-router-dom";
import { useCategories } from "../state/CategoriesContext";

import CategoriesList from "../components/CategoriesList";

export default function Home() {
  return (
    <div id="home">
      <div>Hero</div>
      <CategoriesList />
    </div>
  );
}
