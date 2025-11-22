import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { fetchFlashcard } from "../utils/http";

import Card from "../components/Card";
import Title from "../components/Title";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/Error";

export default function Flashcards() {

    const { user } = useContext(UserContext);

    const { data: flashcards, isPending, isError } = useQuery({
        queryKey: ["flashcards", user?.id],
        queryFn: async ({ queryKey, signal }) => {
            const [_key, userId] = queryKey;
            return fetchFlashcard({ userId: userId as string });
        },
        enabled: !!user?.id
    });

    return <>
        <section className="p-4 sm:p-8 xl:p-16">
            <Card styling="p-5 md:w-3/3 lg:w-3/4 xl:w-2/3">
                <Title title="Add flashcards" />
                {!flashcards && <p>No flashcards.</p>}
                {isPending && <Spinner />}
                {flashcards && <p>{flashcards[0].answer}</p>}
                {isError && <Error errors={["Something went wrong. Please try again later."]} />}
            </Card>
        </section>
    </>
}