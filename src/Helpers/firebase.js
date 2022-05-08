import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider , getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyACbaEMgf0aYUR7ihs8-OgE1JRU2IEIPT0",
  authDomain: "mobi-ecommerce.firebaseapp.com",
  projectId: "mobi-ecommerce",
  storageBucket: "mobi-ecommerce.appspot.com",
  messagingSenderId: "186377066407",
  appId: "1:186377066407:web:63df93897dbd7eecae8882"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  export {provider , auth}