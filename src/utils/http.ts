import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { QueryClient } from "@tanstack/react-query";

import { auth } from "../firebase/config";

export const queryClient = new QueryClient();


const login = async ({ email, password }: { email: string, password: string }) => {
    await signInWithEmailAndPassword(auth, email, password);
}