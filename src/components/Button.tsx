import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styling?: string;
}

export default function Button({ styling, children, ...props }: ButtonProps) {

    const style = `rounded-md px-2 py-1 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${styling || ""}`;

    return <button {...props} className={style}>{children}</button>
}