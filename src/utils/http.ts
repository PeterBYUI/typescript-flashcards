import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where, updateDoc, doc, setDoc, serverTimestamp, orderBy, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { QueryClient } from "@tanstack/react-query";

import type { FlashcardModel } from "../models/FlashcardsModel";
import Flashcard from "../components/Flashcard";

const usersRef = collection(db, "users");
const flashcardsRef = collection(db, "flashcards");

export const queryClient = new QueryClient();


//Auth

export const signup = async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = `${firstName} ${lastName}`
    await updateProfile(res.user, {
        displayName
    });
    await res.user.reload();
    await addDoc(usersRef, {
        id: res.user.uid,
        firstName,
        lastName,
        email,
        displayName
    });
    return res.user;
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    await signInWithEmailAndPassword(auth, email, password);
}

export const resetPassword = async ({ email }: { email: string }) => {
    await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
    await signOut(auth);
}

//Flashcards

export const fetchFlashcard = async ({ userId }: { userId: string }) => {
    const flashcardsQuery = query(flashcardsRef, where("userId", "==", userId), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(flashcardsQuery);
    const flashcards: FlashcardModel[] = snapshot.docs.map((flashcard) => {
        return {
            id: flashcard.id,
            ...flashcard.data(),
        } as FlashcardModel;
    });
    return flashcards;
}

// export const updateFlashcard = async ({ flashcardId, updates }: { flashcardId: string, updates: Partial<FlashcardModel> }) => {
//     const flashcardRef = doc(db, "flashcards", flashcardId);
//     // merge: true ensures update works even if doc is missing
//     await setDoc(flashcardRef, updates, { merge: true });
// }

export const addFlashcard = async ({ userId, question, answer }: { userId: string, question: string, answer: string }) => {
    if (!userId || !question || !answer) return;

    await addDoc(flashcardsRef, { userId, question, answer, createdAt: serverTimestamp() })
}

export const deleteFlashcard = async ({ flashcardId }: { flashcardId: string }) => {
    if (!flashcardId) return;
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await deleteDoc(flashcardRef);
}