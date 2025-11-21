interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styling?: string;
    isError?: boolean;
}

export default function Input({ styling, isError, ...props }: InputProps) {
    let style = `bg-[#eee] rounded-md mx-auto block px-2 py-1 ${styling || ""} `

    if (isError) {
        style += "focus:outline-2 focus:outline-red-400";
    } else {
        style += "focus:outline-2 focus:outline-[rgba(100,190,171)]";
    }



    return <input {...props} className={style} />
}