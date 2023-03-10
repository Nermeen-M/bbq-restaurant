import { useNavigate, useParams } from "react-router-dom";

export default function ProductItem({ item }) {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/menu/${categoryName}/${item.id}`)}
    >
      <div className="text">
        <h3>{item.title}</h3>
        <p>{item.brief}</p>
        <span>Price: {item.price} :-</span>
      </div>
      <img width="100" src={item.image} alt={item.title} />
    </div>
  );
}
