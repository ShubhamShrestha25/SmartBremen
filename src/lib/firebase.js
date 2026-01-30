import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration - shared with SmartBremenBackend
const firebaseConfig = {
  apiKey: "AIzaSyBBTXjk_6o6s8cUV-F-RGESFh9n3V8V6wA",
  authDomain: "smartbremen.firebaseapp.com",
  projectId: "smartbremen",
  storageBucket: "smartbremen.firebasestorage.app",
  messagingSenderId: "379919816496",
  appId: "1:379919816496:web:2773c1bc057dce18e0daf5",
  measurementId: "G-XJF36F8GTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
