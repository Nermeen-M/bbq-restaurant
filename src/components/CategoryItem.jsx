export default function CategoryItem({ item }) {
  return (
    <div className="category-card">
      <img width="200" src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <button>View</button>
    </div>
  );
}
