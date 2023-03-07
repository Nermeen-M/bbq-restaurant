import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdwJHMDrQN19rIOIoV2Bkp0Ew6GZVRLpY",
  authDomain: "fire-grill-bbq-restaurant.firebaseapp.com",
  projectId: "fire-grill-bbq-restaurant",
  storageBucket: "fire-grill-bbq-restaurant.appspot.com",
  messagingSenderId: "100361334509",
  appId: "1:100361334509:web:f003d6ff54fe664037a6e4",
};

const firebaseApp = initializeApp(firebaseConfig);

export const database = getFirestore(firebaseApp);
export const cloudStorage = getStorage(firebaseApp);
