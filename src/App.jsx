import { Routes, Route } from "react-router-dom";

import Admin from "./admin/Admin";

export default function App() {
  return (
    <div className="App">
      <h1>Fire grill</h1>
      <Routes>
        <Route path="/" element={<p>Home</p>} exact />
        <Route path="/menu" element={<p>Menu</p>} />
        <Route path="/menu/:categoryName" element={<p>Category</p>} />
        <Route path="/menu/:categoryName/:productId" element={<p>Product</p>} />
        <Route path="/contact" element={<p>Contact</p>} />
        <Route path="/admin" element={<Admin />} exact />
      </Routes>
    </div>
  );
}
