import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { QueryClient } from "@tanstack/react-query";

import type { FlashcardsModel } from "../models/FlashcardsModel";

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
    const flashcardsQuery = query(flashcardsRef, where("userId", "==", userId));
    const snapshot = await getDocs(flashcardsQuery);
    const flashcards: FlashcardsModel[] = snapshot.docs.map((flashcard) => {
        return {
            id: flashcard.id,
            ...flashcard.data(),
        } as FlashcardsModel;
    });
    return flashcards;
}