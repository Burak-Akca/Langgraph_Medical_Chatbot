import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDqIBPG7IE0jbrv_-aX5hvqHfhgZHusOlo",
  authDomain: "medical-chatbot-ec658.firebaseapp.com",
  projectId: "medical-chatbot-ec658",
  storageBucket: "medical-chatbot-ec658.firebasestorage.app",
  messagingSenderId: "5491433303",
  appId: "1:5491433303:web:7986e5b60f8e243359e812"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
