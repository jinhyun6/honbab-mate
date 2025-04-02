import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 추가

const firebaseConfig = {
  apiKey: "AIzaSyD2s50K-qpTy5uwQs81AF0c2gmM8tkK9E8",
  authDomain: "honbabmate-3442c.firebaseapp.com",
  projectId: "honbabmate-3442c",
  storageBucket: "honbabmate-3442c.appspot.com",
  messagingSenderId: "796705648319",
  appId: "1:796705648319:web:b2657d806e01c35c2aa00a"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // 👈 추가
export const provider = new GoogleAuthProvider(); // 👈 추가

