import { Timestamp } from "firebase/firestore";

export type UserModel = {
    id: string;
    email: string;
    displayName: string;
    createdAt: Timestamp;
}