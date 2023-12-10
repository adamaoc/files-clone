import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA8tXTWG0ep_JStLyEhe3LHZKNdXn1AK-Y",
  authDomain: "files-clone.firebaseapp.com",
  projectId: "files-clone",
  storageBucket: "files-clone.appspot.com",
  messagingSenderId: "693421672270",
  appId: "1:693421672270:web:c4629b582fbde6178d001f"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }