import { useCategories } from "../state/CategoriesContext";

import CategoryItem from "../components/CategoryItem";

export default function Menu() {
  const { categories } = useCategories();

  const categoriesList = categories.map((item) => (
    <CategoryItem key={item.id} item={item} />
  ));

  return <div id="menu">{categoriesList}</div>;
}
