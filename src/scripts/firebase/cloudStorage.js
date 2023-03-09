import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { cloudStorage } from "./firebaseSetup";

export async function uploadFile(file, filePath) {
  const reference = ref(cloudStorage, filePath);

  await uploadBytes(reference, file);

  return `File uploaded successfully to ${filePath}`;
}

export async function downloadFile(filePath) {
  const reference = ref(cloudStorage, filePath);
  const result = await getDownloadURL(reference);

  return result;
}
