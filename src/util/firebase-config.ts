import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQ5DSHQfduK-lbrkCUeuOUlSNaTs-F_sA",
  authDomain: "led2-6a5cf.firebaseapp.com",
  databaseURL: "https://led2-6a5cf-default-rtdb.firebaseio.com",
  projectId: "led2-6a5cf",
  storageBucket: "led2-6a5cf.appspot.com",
  messagingSenderId: "868771039465",
  appId: "1:868771039465:web:e98b7ac460dc48cdfe4878",
  measurementId: "G-1RRJB38RZX",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

export default firebaseConfig;

export { database, firestore };
