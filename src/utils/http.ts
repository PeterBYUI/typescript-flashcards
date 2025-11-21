import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { QueryClient } from "@tanstack/react-query";

import { auth } from "../firebase/config";

export const queryClient = new QueryClient();


export const login = async ({ email, password }: { email: string, password: string }) => {
    await signInWithEmailAndPassword(auth, email, password);
}

export const resetPassword = async ({ email }: { email: string }) => {
    await sendPasswordResetEmail(auth, email);
};