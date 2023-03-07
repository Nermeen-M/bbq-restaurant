export default function CategoryItemAdmin({ item }) {
  const { title, imageURL } = item;
  return (
    <div>
      <div>
        <img width="100" src={imageURL} />
        <h3>{title}</h3>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
