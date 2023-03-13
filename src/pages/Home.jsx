import { useNavigate } from "react-router-dom";

import CategoriesList from "../components/CategoriesList";

// good
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
      {/* Similar to the "phase" if the only funciton of this page is to load another page, then put everything in a single page -1 */}
      <section className="categories-list">
        <CategoriesList />
      </section>
    </main>
  );
}
