import type { FlashcardModel } from "../models/FlashcardsModel";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, addFlashcard, deleteFlashcard, updateFlashcard } from "../utils/http";
import { UserContext } from "../store/UserContext";

import Input from "./Input";
import Button from "./Button";
import Text from "./Text";

import ConfirmSvg from "./svgs/Confirm";
import EditSvg from "./svgs/Edit";
import DeleteSvg from "./svgs/Delete";
import CancelSvg from "./svgs/Cancel";

type FlashcardComponentProps = {
    flashcard?: FlashcardModel;
    isNew: boolean;
    handleCloseAddition?: () => void;
}

export default function Flashcard({ flashcard, isNew, handleCloseAddition }: FlashcardComponentProps) {

    const [card, setCard] = useState<Partial<FlashcardModel>>(flashcard ? flashcard : {
        question: "",
        answer: "",
    });

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

    //Optimistic flashcard updating
    const { mutate: optimisticUpdate } = useMutation({
        mutationFn: updateFlashcard,
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: flashcardsKey });
            const flashcards = queryClient.getQueryData(flashcardsKey) as FlashcardModel[];
            const updatedFlashcards = flashcards.map((f) => {
                if (f.id === data.flashcardId) {
                    return {
                        ...f,
                        ...data.updates //{question: "question", answer: "answer"}
                    }
                } else {
                    return f;
                }
            });
            queryClient.setQueryData(flashcardsKey, updatedFlashcards);
            return { flashcards };
        },
        onError: (error, data, context) => {
            queryClient.setQueryData(flashcardsKey, context?.flashcards);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: flashcardsKey });
        }
    });

    return <div className="grid rounded-md p-2 shadow-[0_5px_10px_rgba(0,0,0,.3)] md:shadow-none grid-cols-1 text-center justify-items-center md:text-start md:grid-cols-[2fr_2fr_1fr] gap-4 items-start">
        <div className="flex flex-col">
            <label className="text-[rgba(100,190,171)] font-semibold text-sm md:text-md lg:text-base">Question</label>
            {!isEditing && card?.question && <Text str={card?.question} />}
            {isEditing && <Input styling="w-1/1" value={card?.question || ""} onChange={(e) => handleTextChange(e, true)} />
            }
        </div>
        <div className="flex flex-col">
            <label className="text-[rgba(100,190,171)] font-semibold text-sm md:text-md lg:text-base">Answer</label>
            {!isEditing && card?.answer && <Text str={card?.answer} />}
            {isEditing && <Input styling="w-1/1" value={card?.answer || ""} onChange={(e) => handleTextChange(e, false)} />
            }
        </div>
        {!isNew && <div className="flex gap-2 row-span-2">
            <Button onClick={() => {
                if (!isEditing) {
                    setIsEditing(true)
                } else { //isEditing
                    if (flashcard?.id) {
                        optimisticUpdate({ flashcardId: flashcard?.id, updates: card });
                        setIsEditing(false)
                    }
                }
            }} styling={`translate-y-[20%] text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)]`}>
                {isEditing ? <ConfirmSvg /> : <EditSvg />}
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
                {isEditing ? <CancelSvg /> : <DeleteSvg />}
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