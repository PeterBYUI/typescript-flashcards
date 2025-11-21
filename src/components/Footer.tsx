import { useNavigate } from "react-router";

import Button from "./Button";

export default function Footer({ path, title }: { path: string, title: string }) {

    const navigate = useNavigate();

    return <>
        <hr className="border-[.1px] border-slate-100 my-4" />
        <div className="flex justify-center">
            <Button onClick={() => navigate(path)} styling="text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)] font-semibold">{title}</Button>
        </div>
    </>

}