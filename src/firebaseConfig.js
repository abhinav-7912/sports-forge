import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_ApucukmSA8nWYS1QnajD48tcYKgrQnw",
  authDomain: "sportsforge-3faff.firebaseapp.com",
  projectId: "sportsforge-3faff",
  storageBucket: "sportsforge-3faff.appspot.com",
  messagingSenderId: "270659316148",
  appId: "1:270659316148:web:e4a3a02bb806b6f4b1eae1",
  measurementId: "G-NMZ8FJCHRN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore =getFirestore(app);
const storage = getStorage(app);
export {app,auth,firestore,storage};