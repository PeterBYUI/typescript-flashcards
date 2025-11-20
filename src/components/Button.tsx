import type React from "react";

interface ButtonProps {
    styling?: string;
}

export default function Button({ styling, children }: React.PropsWithChildren<ButtonProps>) {

    const style = "rounded-md px-2 py-1 text-[#fff] transition-all duration-200 cursor-pointer " + styling || "";

    return <button className={style}>{children}</button>
}