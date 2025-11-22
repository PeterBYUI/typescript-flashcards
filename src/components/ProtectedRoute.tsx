import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router";

import Card from "./Card";
import Title from "./Title";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (user === undefined) {
        return <Card styling="p-5 sm:w-3/3 md:w-2/3 lg:w-1/3 xl:w-1/3 mx-auto mt-8">
            <Title title="Fetching the user..." />
        </Card>
    }
    if (user === null) {
        console.log("The user is null baby girl.");
        navigate("/login");
    }
    if (user) {
        return children;
    }
}