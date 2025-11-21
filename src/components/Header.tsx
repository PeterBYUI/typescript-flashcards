import { NavLink } from "react-router"

export default function Header() {

    let styling = "hover:text-[#999] transition-all duration-200 pb-1 border-b-2  ";
    let activeStyling = "border-b-[#888]";
    let inactiveStyling = "border-b-transparent";

    return <header className="h-16 bg-[rgba(250,250,250,0.3)] flex items-center justify-around text-[#555]">
        <h1 className="text-2xl">Flashcards</h1>
        <ul className="flex gap-16">
            <li><NavLink to={"flashcards"} className={(({ isActive }) => isActive ? `${styling}${activeStyling}` : `${styling}${inactiveStyling}`)}>Flashcards</NavLink></li>
            <li><NavLink to={"exercise"} className={(({ isActive }) => isActive ? `${styling}${activeStyling}` : `${styling}${inactiveStyling}`)}>Exercise</NavLink></li>
        </ul>
    </header>
}