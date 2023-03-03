import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <h1>Texas fire</h1>
      <Routes>
        <Route path="/" element={<p>Home</p>} exact />
        <Route path="/menu" element={<p>Menu</p>} />
        <Route path="/menu/:categoryName" element={<p>Category</p>} />
        <Route path="/menu/:categoryName/:productId" element={<p>Product</p>} />
        <Route path="/contact" element={<p>Contact</p>} />
      </Routes>
    </div>
  );
}
