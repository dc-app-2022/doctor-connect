// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCafzxEXsm5PmbgrLMtTrqqYSvcL28B5SQ",
  authDomain: "doctor-connect-2022.firebaseapp.com",
  projectId: "doctor-connect-2022",
  storageBucket: "doctor-connect-2022.appspot.com",
  messagingSenderId: "329785735613",
  appId: "1:329785735613:web:ca96a677b2cfb09489fad4",
  measurementId: "G-HXJL9YL46Y",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
