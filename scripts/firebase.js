import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOM6ruVDca0p3lwpT-Bh0Th2kbK4Ae92Y",
  authDomain: "kingsland-events.firebaseapp.com",
  projectId: "kingsland-events",
  appId: "1:985445105023:web:0f5bc83e7e8e90597dee4a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Get Data from Firestore Collection
export const querySnapshot = await getDocs(collection(db, "events"));
