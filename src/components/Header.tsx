import { useState } from "react";

import DesktopHeader from "./DesktopHeader";
import Sidebar from "./Sidebar";

export default function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleToggleSidebar() {
        setIsOpen((previousValue) => !previousValue);
    }

    return <header className="relative">
        <DesktopHeader handleToggleSidebar={handleToggleSidebar} />
        <Sidebar isOpen={isOpen} handleToggleSidebar={handleToggleSidebar} />
    </header>
}