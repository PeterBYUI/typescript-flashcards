import { NavLink, } from "react-router";
import type { HeaderProps } from "./Header";

import Button from "./Button";
import ProfileButton from "./ProfileButton";

export default function DesktopHeader({ handleToggleSidebar, handleLoggingUserOut, isPending }: HeaderProps) {

    let styling = "hover:text-teal-900 text-base md:text-lg transition-all duration-200  ";
    let activeStyling = "font-semibold";


    return <div className="h-16 bg-[rgba(250,250,250,0.3)] flex items-center justify-around text-teal-700">

        <ul className="flex gap-4 md:gap-16">
            <li><NavLink to={"flashcards"} className={(({ isActive }) => isActive ? `${styling}${activeStyling}` : styling)}>Flashcards</NavLink></li>
            <li><NavLink to={"exercise"} className={(({ isActive }) => isActive ? `${styling}${activeStyling}` : styling)}>Exercise</NavLink></li>
        </ul>
        <div className="hidden md:flex md:items-center md:gap-4">
            <ProfileButton />
            <Button onClick={handleLoggingUserOut} styling="hover:text-teal-900 group disabled:text-teal-300" disabled={isPending}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 stroke-[1.5] group-hover:stroke-[2.2]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                    </svg>
                    <p>Log out</p>
                </div>
            </Button>
        </div>
        <div className="block md:hidden">
            <Button onClick={handleToggleSidebar} styling="hover:text-teal-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </Button>
        </div>
    </div>
}