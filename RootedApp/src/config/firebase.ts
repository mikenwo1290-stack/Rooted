import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOHIvwH5EvEHTC55QLVJ3ATxIyL5dTyUc",
  authDomain: "rooted-90e83.firebaseapp.com",
  projectId: "rooted-90e83",
  storageBucket: "rooted-90e83.firebasestorage.app",
  messagingSenderId: "1048230349681",
  appId: "1:1048230349681:web:bb580fb09db9d5ddb284d0",
  measurementId: "G-5PFGFP94K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
