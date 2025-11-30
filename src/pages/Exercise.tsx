import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { fetchFlashcard } from "../utils/http";
import type { GameModel } from "../models/GameModel";

import Spinner from "../components/spinner/Spinner";
import Button from "../components/Button";
import Error from "../components/Error";
import FlipCard from "../components/FlipCard";
import ProgressBar from "../components/ProgressBar";

export default function Exercise() {

    const { user } = useContext(UserContext);

    const { data: flashcards, isPending, isError } = useQuery({
        queryKey: ["flascards", user?.id],
        queryFn: async ({ queryKey, signal }) => {
            const [_key, userId] = queryKey;
            return fetchFlashcard({ userId: userId as string });
        },
        enabled: !!user?.id
    });

    const [gameHasStarted, setGameHasStarted] = useState<boolean>(false);

    const [game, setGame] = useState<GameModel>({
        questionIndex: 0,
        score: 0,
        answerIsRevealed: false,
        gameIsOver: false,
    });

    function handleFlipCard() {
        setGame((previousState) => ({ ...previousState, answerIsRevealed: true }));
    }

    function handleNextFlashcard(answerWasCorrect: boolean, maxIndex: number) {
        setGame((previousState) => {
            return {
                questionIndex: previousState.questionIndex < maxIndex - 1 ? previousState.questionIndex + 1 : previousState.questionIndex,
                score: answerWasCorrect ? previousState.score + 1 : previousState.score,
                answerIsRevealed: false,
                gameIsOver: previousState.questionIndex == maxIndex - 1 ? true : false
            }
        });
    }

    function resetGame() {
        setGame((previousState) => {
            return {
                questionIndex: 0,
                score: 0,
                answerIsRevealed: false,
                gameIsOver: false
            }
        });
        setGameHasStarted(false);
    }

    if (isPending) {
        return <div className="mt-16"><Spinner /></div>
    }

    if (isError) {
        return <div className="w-2/3 lg:w-1/2 mx-auto mt-16">
            <Error errors={["We couldn't fetch your flashcards. Check your connection and try again."]} />
        </div>
    }

    if (flashcards) {
        if (!gameHasStarted) {
            return <section className="text-center">
                <h3 className="mt-16 mb-8 text-4xl font-semibold text-teal-800">Let's review your flashcards!</h3>
                <div className="mt-16 flex flex-col gap-8 items-center">
                    <p className="text-xl">You currently have <strong>{flashcards.length}</strong> flashcards to study.</p>
                    <Button onClick={() => setGameHasStarted(true)} styling="bg-teal-400 hover:bg-teal-500 text-[#eee] text-xl h-16 w-3/5 md:w-2/5 lg:w-1/5">Start learning</Button>
                </div>
            </section>
        } else { //actual game
            if (!game.gameIsOver) {
                return <section className="text-center">
                    <h3 className="mt-16 mb-8 text-xl font-semibold text-teal-800">Flashcard nº{game.questionIndex + 1}</h3>
                    <div className="flex flex-col gap-8 w-2/3 md:w-1/2 mx-auto">
                        <div className="w-1/1 flex flex-col gap-2 md:gap-0 md:flex-row items-center">
                            <p className="md:w-1/4 text-gray-800 text-lg lg:text-xl font-semibold">Score: {game.score}</p>
                            <ProgressBar currentIndex={game.questionIndex} total={flashcards.length} />
                        </div>
                        <FlipCard question={flashcards[game.questionIndex].question} answer={flashcards[game.questionIndex].answer} answerIsRevealed={game.answerIsRevealed} />
                        {!game.answerIsRevealed ?
                            <Button onClick={handleFlipCard} styling="w-1/3 mx-auto bg-teal-400 hover:bg-teal-500 text-[#eee]">Reveal answer</Button>
                            :
                            <div className="w-1/1 flex flex-col sm:flex-row justify-center items-center gap-4 text-[#eee]">
                                <Button onClick={() => handleNextFlashcard(false, flashcards.length)} styling="bg-red-400 hover:bg-red-500">I didn't know that</Button>
                                <Button onClick={() => handleNextFlashcard(true, flashcards.length)} styling="bg-teal-400 hover:bg-teal-500">I knew that</Button>
                            </div>
                        }
                    </div>
                </section>
            } else { //game over
                return <section className="text-center flex flex-col gap-8 items-center">
                    <h3 className="mt-16 text-4xl font-semibold text-teal-800">Game over!</h3>
                    <p className="text-emerald-700 text-xl font-semibold">Your score: {game.score}/{flashcards.length}</p>
                    <Button styling="bg-teal-500 hover:bg-teal-600 text-[#eee] h-10 w-1/2 md:w-1/5 lg:w-1/6" onClick={resetGame}>Close game</Button>
                </section>

            }
        }
    }
}