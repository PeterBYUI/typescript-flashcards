import type { FlashcardModel } from "../models/FlashcardsModel";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, addFlashcard, deleteFlashcard, updateFlashcard } from "../utils/http";
import { UserContext } from "../store/UserContext";

import Input from "./Input";
import Button from "./Button";
import Text from "./Text";

import EditSvg from "./svgs/Edit";
import DeleteSvg from "./svgs/Delete";
import CancelSvg from "./svgs/Cancel";
import ConfirmSvg from "./svgs/Confirm";

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
            setCard({
                question: "",
                answer: ""
            });
            handleCloseAddition?.();
            queryClient.invalidateQueries({ queryKey: flashcardsKey });
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
        <div className="flex flex-col w-1/1">
            <label className="text-[rgba(100,190,171)] font-semibold text-sm md:text-md lg:text-base">Question</label>
            {!isEditing && card?.question && <Text str={card?.question} />}
            {isEditing && <Input styling="w-1/1 text-center md:text-start" value={card?.question || ""} onChange={(e) => handleTextChange(e, true)} />
            }
        </div>
        <div className="flex flex-col w-1/1">
            <label className="text-[rgba(100,190,171)] font-semibold text-sm md:text-md lg:text-base">Answer</label>
            {!isEditing && card?.answer && <Text str={card?.answer} />}
            {isEditing && <Input styling="w-1/1 text-center md:text-start" value={card?.answer || ""} onChange={(e) => handleTextChange(e, false)} />
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
                <ConfirmSvg />
            </Button>
            <Button onClick={handleCloseAddition} styling="translate-y-[20%] text-red-400 hover:text-red-500">
                <CancelSvg />
            </Button>
        </div>}
    </div>
}