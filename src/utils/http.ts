import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { QueryClient } from "@tanstack/react-query";

const usersRef = collection(db, "users");

export const queryClient = new QueryClient();

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