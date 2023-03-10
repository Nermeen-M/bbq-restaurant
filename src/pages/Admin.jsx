import { useState } from "react";

import ManageCategories from "../admin/ManageCategories";
import ManageProducts from "../admin/ManageProducts";

export default function Admin({ setModal }) {
  const [isCategoryActive, setIsCategoryActive] = useState(true);
  const collectionName = "categories";

  return (
    <div id="admin">
      <div className="admin-nav">
        <button
          onClick={() => setIsCategoryActive(true)}
          className={isCategoryActive && "active"}
        >
          Categories
        </button>
        <button
          onClick={() => setIsCategoryActive(false)}
          className={!isCategoryActive && "active"}
        >
          Products
        </button>
      </div>

      {isCategoryActive && (
        <ManageCategories collectionName={collectionName} setModal={setModal} />
      )}
      {!isCategoryActive && <ManageProducts setModal={setModal} />}
    </div>
  );
}
