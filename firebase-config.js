// assets/js/core/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1oruCNXKXHxs9NhtYmkBtylZ4OZXuHic",
  authDomain: "almasaref-af320.firebaseapp.com",
  projectId: "almasaref-af320",
  storageBucket: "almasaref-af320.firebasestorage.app",
  messagingSenderId: "220771901692",
  appId: "1:220771901692:web:7a8bf9eeca066e55cc7779",
  measurementId: "G-956DLWSLTM"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);