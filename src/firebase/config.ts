// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACJ1N0K37y8c2GuTJQK7rC99cxGeF91TY",
    authDomain: "typescript-flashcards.firebaseapp.com",
    projectId: "typescript-flashcards",
    storageBucket: "typescript-flashcards.firebasestorage.app",
    messagingSenderId: "431284155856",
    appId: "1:431284155856:web:55aead91d63c49a7caf5d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth();