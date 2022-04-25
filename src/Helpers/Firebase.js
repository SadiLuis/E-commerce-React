import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider , getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCa4VoGWSv4ye36ZQwqEdWz48xrOJ-iefg",
  authDomain: "ecommerce-muebles.firebaseapp.com",
  projectId: "ecommerce-muebles",
  storageBucket: "ecommerce-muebles.appspot.com",
  messagingSenderId: "361855539010",
  appId: "1:361855539010:web:974b1a434eb53245979adb"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  export {provider , auth}