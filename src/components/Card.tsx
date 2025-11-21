interface CardProps {
    styling?: string;
}

export default function Card({ styling, children }: React.PropsWithChildren<CardProps>) {

    const style = `bg-[#fff] rounded-md shadow-[0_5px_10px_rgba(0,0,0,.3)] mx-auto ${styling || ""}`;

    return <figure className={style}>{children}</figure>
}