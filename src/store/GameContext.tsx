import { createContext, useState } from "react";
import type { GameModel } from "../models/GameModel";

interface GameContextValue {
    gameHasStarted: boolean;
    game: GameModel;
    resetGame: () => void;
    handleFlipCard: () => void;
    handleNextFlashcard: (answerWasCorrect: boolean, maxIndex: number) => void;
}

export const GameContext = createContext<GameContextValue>({
    gameHasStarted: false,
    game: {
        questionIndex: 0,
        score: 0,
        answerIsRevealed: false,
        gameIsOver: false,
    },
    resetGame: () => { },
    handleFlipCard: () => { },
    handleNextFlashcard: () => { },
}
);

export default function GameContextProvider({ children }: { children: React.ReactNode }) {

    const [gameHasStarted, setGameHasStarted] = useState<boolean>(false);

    const [game, setGame] = useState<GameModel>({
        questionIndex: 0,
        score: 0,
        answerIsRevealed: false,
        gameIsOver: false,
    });

    function handleFlipCard() {
        setGame((previousState: GameModel) => ({ ...previousState, answerIsRevealed: true }));
    }

    function handleNextFlashcard(answerWasCorrect: boolean, maxIndex: number) {
        setGame((previousState: GameModel) => {
            return {
                questionIndex: previousState.questionIndex < maxIndex - 1 ? previousState.questionIndex + 1 : previousState.questionIndex,
                score: answerWasCorrect ? previousState.score + 1 : previousState.score,
                answerIsRevealed: false,
                gameIsOver: previousState.questionIndex == maxIndex - 1 ? true : false
            }
        });
    }

    function resetGame() {
        setGame(() => {
            return {
                questionIndex: 0,
                score: 0,
                answerIsRevealed: false,
                gameIsOver: false
            }
        });
        setGameHasStarted(false);
    }

    const contextValue: GameContextValue = {
        gameHasStarted,
        game,
        resetGame,
        handleFlipCard,
        handleNextFlashcard
    }

    return <GameContext value={contextValue}>{children}</GameContext>
}