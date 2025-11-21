import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../utils/http";

import DesktopHeader from "./DesktopHeader";
import Sidebar from "./Sidebar";

export type HeaderProps = {
    handleToggleSidebar: () => void;
    handleLoggingUserOut: () => void;
    isPending: boolean;
}

export default function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleToggleSidebar() {
        setIsOpen((previousValue) => !previousValue);
    }

    const navigate = useNavigate();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/");
            setIsOpen(false);
        }
    });

    function handleLoggingUserOut() {
        mutate();
    }

    return <header className="relative">
        <DesktopHeader handleToggleSidebar={handleToggleSidebar} handleLoggingUserOut={handleLoggingUserOut} isPending={isPending} />
        <Sidebar isOpen={isOpen} handleToggleSidebar={handleToggleSidebar} handleLoggingUserOut={handleLoggingUserOut} isPending={isPending} />
    </header>
}