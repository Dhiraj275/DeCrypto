import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVdPRdhs7rfRqk0sEpomU2dvgdvbr5Nzw",
  authDomain: "decrypto-project.firebaseapp.com",
  databaseURL: "https://decrypto-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "decrypto-project",
  storageBucket: "decrypto-project.appspot.com",
  messagingSenderId: "176031797456",
  appId: "1:176031797456:web:1310c80811d7b4ffccced5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app)
export { database, auth }