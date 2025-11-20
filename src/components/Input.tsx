interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styling?: string;
}

export default function Input({ styling, ...props }: InputProps) {
    const style = "bg-[#eee] rounded-md mx-auto block px-2 py-1 focus:outline-2 focus:outline-[rgba(100,190,171)] " + styling || "";
    return <input {...props} className={style} />
}