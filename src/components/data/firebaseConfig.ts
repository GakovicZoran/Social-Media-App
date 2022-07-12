import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAswgHbH4UHlR7u2scfjlrDx-VBL4eCfsk",
  authDomain: "social-media-app-a1cb2.firebaseapp.com",
  projectId: "social-media-app-a1cb2",
  storageBucket: "social-media-app-a1cb2.appspot.com",
  messagingSenderId: "268305358750",
  appId: "1:268305358750:web:110aff9c369f3e98ed008f",
});

export const db = firebaseConfig.firestore();
export const auth = getAuth();
export const storage = getStorage();
