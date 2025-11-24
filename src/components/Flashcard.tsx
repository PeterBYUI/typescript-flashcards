import type { FlashcardModel } from "../models/FlashcardsModel";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, addFlashcard, deleteFlashcard } from "../utils/http";
import { UserContext } from "../store/UserContext";

import Input from "./Input";
import Button from "./Button";
import Spinner from "./spinner/Spinner";

type FlashcardComponentProps = {
    flashcard?: FlashcardModel;
    isNew: boolean;
    handleCloseAddition?: () => void;
}

export default function Flashcard({ flashcard, isNew, handleCloseAddition }: FlashcardComponentProps) {

    const [card, setCard] = useState<Partial<FlashcardModel> | undefined>(flashcard);

    const { user } = useContext(UserContext);

    //use useMutation to optimistically update the flashcards

    const flashcardsKey = ["flashcards", user?.id];


    const { mutate: addNewFlashcard, isPending, isError } = useMutation({
        mutationFn: addFlashcard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: flashcardsKey });
            setCard({
                question: "",
                answer: ""
            });
            handleCloseAddition?.();
        }
    });

    const { mutate: deleteTarget, isPending: isDeletionPending, isError: isErrorPending } = useMutation({
        mutationFn: deleteFlashcard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: flashcardsKey });
        }
    });


    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>, isQuestion: boolean) {
        setCard((prevCard) => {
            if (!prevCard) return undefined;
            if (isQuestion) {
                return {
                    ...prevCard,
                    question: e.target.value,
                }
            } else {
                return {
                    ...prevCard,
                    answer: e.target.value,
                }
            }
        });
    }

    const [isEditing, setIsEditing] = useState<boolean>(isNew);

    return <div className="grid grid-cols-[2fr_2fr_1fr] gap-4">
        <div className="flex flex-col">
            <label className="text-[rgba(100,190,171)] font-semibold">Question</label>
            {!isEditing && <p className="px-2">{card?.question}</p>}
            {isEditing && <Input styling="w-1/1" value={card?.question || ""} onChange={(e) => handleTextChange(e, true)} />
            }
        </div>
        <div className="flex flex-col">
            <label className="text-[rgba(100,190,171)] font-semibold">Answer</label>
            {!isEditing && <p className="px-2">{card?.answer}</p>}
            {isEditing && <Input styling="w-1/1" value={card?.answer || ""} onChange={(e) => handleTextChange(e, false)} />
            }
        </div>
        {!isNew && <div className="flex gap-2">
            <Button onClick={() => {
                if (!isEditing) {
                    setIsEditing(true)
                }
            }} styling={`translate-y-[20%] text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)]`}>
                {isEditing ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>}
            </Button>
            <Button onClick={() => {
                if (!isEditing) {
                    console.log("about to delete")
                    if (flashcard?.id && user?.id) {
                        console.log("Id detected")
                        deleteTarget({ flashcardId: flashcard.id })
                    }
                }
            }} styling="translate-y-[20%] text-red-400 hover:text-red-500">
                {isEditing ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>}
            </Button>
        </div>}
        {isNew && <div className="flex gap-2">
            <Button onClick={() => {
                if (!user?.id || !card?.question || !card?.answer) return;
                addNewFlashcard({ userId: user?.id, question: card?.question, answer: card?.answer })
            }} styling="translate-y-[20%] text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </Button>
            <Button onClick={handleCloseAddition} styling="translate-y-[20%] text-red-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </Button>
        </div>}
    </div>
}