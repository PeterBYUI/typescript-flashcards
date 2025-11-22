import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { fetchFlashcard } from "../utils/http";

import Card from "../components/Card";
import Title from "../components/Title";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/Error";
import Flashcard from "../components/Flashcard";
import Button from "../components/Button";

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
        <section className="py-16 px-4 sm:px-8 xl:px-16">
            <Card styling="p-5 md:w-3/3 lg:w-3/4 xl:w-2/3">
                <Title title="Add flashcards" />
                {!flashcards && <p>No flashcards.</p>}
                {isPending && <Spinner />}
                {flashcards && <div className="flex flex-col gap-4">
                    {flashcards.map((flashcard) => <Flashcard flashcard={flashcard} />)}
                </div>}
                {isError && <Error errors={["Something went wrong. Please try again later."]} />}
                <div className="mt-8">
                    <Button styling="text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)]">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                            <p>New flashcard</p>
                        </div>
                    </Button>
                </div>
            </Card>
        </section>
    </>
}