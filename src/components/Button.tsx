import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styling?: string;
}

export default function Button({ styling, children, ...props }: ButtonProps) {

    const style = `rounded-md px-2 py-1 text-[#fff] transition-all duration-200 cursor-pointer ${styling || ""}`;

    return <button {...props} className={style}>{children}</button>
}