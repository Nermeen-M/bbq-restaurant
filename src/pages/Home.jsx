import { useNavigate } from "react-router-dom";

import CategoriesList from "../components/CategoriesList";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main id="home">
      <section className="hero">
        <div className="overlay">
          <div className="text">
            <h1>Fire Grill</h1>
            <h2>Where every flavor tells a story</h2>
            <button
              className="primary-button"
              onClick={() => navigate("/menu")}
            >
              Discover our menu
            </button>
          </div>
        </div>
      </section>
      <section className="categories-list">
        <CategoriesList />
      </section>
    </main>
  );
}
