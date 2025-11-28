export default function FlipCard({ question, answer, answerIsRevealed }: { question: string, answer: string, answerIsRevealed: boolean }) {

    return <figure className="p-8 rounded-md shadow-[0_5px_10px_rgba(0,0,0,.3)] bg-[#eee] w-1/1">
        <p className="text-center font-semibold text-lg">{answerIsRevealed ? answer : question}</p>
    </figure>
}