import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { addDoc, collection, getDocs, query, where, updateDoc, doc, serverTimestamp, orderBy, deleteDoc, writeBatch } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { QueryClient } from "@tanstack/react-query";

import type { FlashcardModel } from "../models/FlashcardsModel";

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

export const updateFlashcard = async ({ flashcardId, updates }: { flashcardId: string, updates: Partial<FlashcardModel> }) => {
    const flashcardRef = doc(db, "flashcards", flashcardId);
    // merge: true ensures update works even if doc is missing
    await updateDoc(flashcardRef, updates);
}

export const addFlashcard = async ({ userId, question, answer }: { userId: string, question: string, answer: string }) => {
    if (!userId || !question || !answer) return;

    await addDoc(flashcardsRef, { userId, question, answer, createdAt: serverTimestamp() })
}

export const deleteFlashcard = async ({ flashcardId }: { flashcardId: string }) => {
    if (!flashcardId) return;
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await deleteDoc(flashcardRef);
}

//Account deletion 

export const deleteUserAccount = async ({ email, password }: { email: string, password: string }) => {
    const credential = EmailAuthProvider.credential(email, password);
    const user = auth.currentUser;
    if (!user) return; //ux?
    await reauthenticateWithCredential(user, credential);

    const flashcardsQuery = query(flashcardsRef, where("userId", "==", user.uid));
    const snapshots = await getDocs(flashcardsQuery);
    const batch = writeBatch(db);

    for (let flashDoc of snapshots.docs) {
        batch.delete(flashDoc.ref);
    }

    const userQuery = query(usersRef, where("id", "==", user.uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot) return; //ux?

    batch.delete(userSnapshot.docs[0].ref);

    await batch.commit();

    await deleteUser(user);
}