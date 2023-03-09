import { useState } from "react";
import ManageCategories from "../admin/ManageCategories";
import ManageProducts from "../admin/ManageProducts";

export default function Admin({ setModal }) {
  const [isCategoryActive, setIsCategoryActive] = useState(true);
  const collectionName = "categories";

  return (
    <div>
      <div>
        <button onClick={() => setIsCategoryActive(true)}>Categories</button>
        <button onClick={() => setIsCategoryActive(false)}>Products</button>
      </div>

      {isCategoryActive && (
        <ManageCategories collectionName={collectionName} setModal={setModal} />
      )}
      {!isCategoryActive && <ManageProducts />}
    </div>
  );
}
