import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhAGgP82euCVxSlbN9xXj7OVmKOXfMv3Y",
  authDomain: "alexann-17cd1.firebaseapp.com",
  databaseURL: "https://alexann-17cd1-default-rtdb.firebaseio.com",
  projectId: "alexann-17cd1",
  storageBucket: "alexann-17cd1.appspot.com",
  messagingSenderId: "1019966263493",
  appId: "1:1019966263493:web:cd2c712cd0e1a3ac7fa0ac",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
