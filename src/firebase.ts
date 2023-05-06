import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDrpT9BqETEsayUVOMDoj8_MnjMzZRMXmE",
  authDomain: "whats-app-clone-6e6f1.firebaseapp.com",
  projectId: "whats-app-clone-6e6f1",
  storageBucket: "whats-app-clone-6e6f1.appspot.com",
  messagingSenderId: "669932463604",
  appId: "1:669932463604:web:67494d4261e67a4f6b85a1",
  measurementId: "G-Q8N8R0B94L",
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const googleProvider=new GoogleAuthProvider();