import { UserContext } from "../store/UserContext";
import { useContext } from "react";

import Button from "./Button";
import ProfileButton from "./ProfileButton";

export default function Sidebar({ isOpen, handleToggleSidebar, handleLoggingUserOut, isPending }: { isOpen: boolean, handleToggleSidebar: () => void, handleLoggingUserOut: () => void, isPending: boolean }) {

    let styling = "absolute block md:hidden h-[100vh] w-1/1 bg-[rgba(191,233,223,.9)] top-0 right-0 transition-all duration-200 ";
    if (isOpen) {
        styling += "translate-x-[0]";
    } else {
        styling += "translate-x-[100%]";
    }

    const { user } = useContext(UserContext);

    return <div className={styling}>
        <div className="relative flex justify-center text-emerald-700">
            <div className="flex flex-col items-center mt-16 gap-8">
                <div className="flex flex-col items-center gap-2 hover:text-emerald-900">
                    <ProfileButton size={24} />
                    <p>{user?.displayName || ""}</p>
                </div>
                <Button onClick={handleLoggingUserOut} styling="font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer text-xl disabled:text-emerald-300" disabled={isPending}>Log out</Button>
            </div>
            <button className="absolute top-2 left-2 cursor-pointer transition-all duration-200" onClick={handleToggleSidebar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
    </div>
}