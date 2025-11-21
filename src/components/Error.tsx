type ErrorProps = {
    errors: string[];
}


export default function Error({ errors }: ErrorProps) {
    return <figure className="p-4 mt-4 rounded-md bg-red-200 flex flex-col items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <ul className="flex flex-col gap-2 items-center text-center">
            {errors.map((error) => (<li><p className="text-xs">{error}</p></li>))}
        </ul>
    </figure>
}