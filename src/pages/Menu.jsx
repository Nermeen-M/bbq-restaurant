import CategoriesList from "../components/CategoriesList";

// good
export default function Menu() {
  return (
    <main id="menu">
      <section className="hero">
        <div className="overlay">
          <div className="text">
            <h1>Menu</h1>
          </div>
        </div>
      </section>
      <section className="categories-list">
        <CategoriesList />
      </section>
    </main>
  );
}
