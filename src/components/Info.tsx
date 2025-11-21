import Button from "./Button"

type InfoProps = {
    message: string;
    closeMessage: () => void;
}

export default function Info({ message, closeMessage }: InfoProps) {
    return <figure className="bg-[rgba(232,254,249,1)] mt-4 text-[#222] text-sm rounded-md p-4 text-center flex flex-col items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[rgba(100,190,171)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p>{message}</p>
        <Button styling="bg-[rgba(100,190,171)] hover:bg-[rgb(79,151,136)] text-[#fff] w-1/3" onClick={closeMessage}>OK</Button>
    </figure>
}