import { createContext, useState, useEffect } from "react";
import type { UserModel } from "../models/UserModel";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// interface UserModel {
//     userId: string;
//     email: string;
//     displayName: string;
// }

interface UserContextValue {
    user: UserModel | null | undefined;
    handleSetUser: (userId: string, email: string, displayName: string) => void;
}

export const UserContext = createContext<UserContextValue>({
    user: {
        userId: "",
        email: "",
        displayName: ""
    },
    handleSetUser: () => { }
});

interface UserContextProviderProps {
    children: React.ReactNode;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {

    const [user, setUser] = useState<UserModel | null | undefined>(undefined);

    function handleSetUser(userId: string, email: string, displayName: string) {
        setUser({
            userId,
            email,
            displayName
        })
    }

    const contextValue: UserContextValue = {
        user,
        handleSetUser
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                let displayName = "";
                if (user.displayName) displayName = user.displayName;
                setUser({
                    userId: user.uid,
                    email: user.email || "",
                    displayName
                })
            } else setUser(null);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <UserContext value={contextValue}>{children}</UserContext>
}
