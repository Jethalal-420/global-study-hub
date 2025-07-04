// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBSZB1Ovf1HLqdFw4yaTaykXr5VfON5rH0',
  authDomain: 'globalstudyhub-28092004.firebaseapp.com',
  projectId: 'globalstudyhub-28092004',
  storageBucket: 'globalstudyhub-28092004.appspot.com', // ✅ fixed domain
  messagingSenderId: '92079013240',
  appId: '1:92079013240:web:597112c0d503cdb4f51c8d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ explicitly initialized

export { app, db, auth };
