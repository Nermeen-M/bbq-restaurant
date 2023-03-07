import { useState, useEffect } from "react";

import { readDocuments } from "../scripts/firebase/fireStore";
import ManageCategories from "./ManageCategories";

export default function Admin() {
  const [status, setStatus] = useState("loading");
  const [loadedData, setLoadedData] = useState();

  const collectionName = "categories";

  useEffect(() => {
    loadData(collectionName);
  }, []);

  async function loadData(collectionName) {
    const data = await readDocuments(collectionName).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    setLoadedData(data);
    setStatus("ready");
  }

  function onFail() {
    setStatus("error");
  }

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "ready" && (
        <ManageCategories data={loadedData} collectionName={collectionName} />
      )}
      {status === "error" && <p>Error</p>}
    </div>
  );
}
