import type { FlashcardModel } from "../models/FlashcardsModel";
import { useState } from "react";

import Input from "./Input";
import Button from "./Button";

type FlashcardComponentProps = {
    flashcard?: FlashcardModel;
    isNew: boolean
}

export default function Flashcard({ flashcard, isNew }: FlashcardComponentProps) {

    const [card, setCard] = useState<FlashcardModel | undefined>(flashcard);

    //use useMutation to optimistiaclly update the flashcards

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

    return <div className="flex gap-4">
        <div className="flex flex-col w-1/1">
            <label className="text-[rgba(100,190,171)] font-semibold">Question</label>
            <Input styling="w-1/1" value={card?.question || ""} onChange={(e) => handleTextChange(e, true)} />
        </div>
        <div className="flex flex-col w-1/1">
            <label className="text-[rgba(100,190,171)] font-semibold">Answer</label>
            <Input styling="w-1/1" value={card?.answer || ""} onChange={(e) => handleTextChange(e, false)} />
        </div>
        <Button styling={!isNew ? "translate-y-[20%] hover:text-red-400" : "translate-y-[20%] hover:text-[rgba(100,190,171)]"}>
            {!isNew ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            }
        </Button>
    </div>
}