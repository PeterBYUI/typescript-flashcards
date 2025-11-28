import { UserContext } from "../store/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import type { HeaderProps } from "./Header";


import Button from "./Button";
import ProfileSvg from "./svgs/Profile";

type SidebarProps = HeaderProps & {
    isOpen: boolean;
}

export default function Sidebar({ isOpen, handleToggleSidebar, handleLoggingUserOut, isPending }: SidebarProps) {

    let styling = "absolute z-100  block md:hidden min-h-[100vh] w-1/1 bg-[rgba(191,233,223)] top-0 right-0 transition-all duration-200 ";
    if (isOpen) {
        styling += "translate-x-[0]";
    } else {
        styling += "translate-x-[100%]";
    }

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    return <div className={styling}>
        <div className="relative flex justify-center text-teal-700">
            <div className="flex flex-col items-center mt-16 gap-8">
                <div className="flex flex-col items-center gap-2 hover:text-teal-900">
                    <Button onClick={() => {
                        navigate("/content/profile");
                        handleToggleSidebar();
                    }}>
                        <ProfileSvg isOnProfilePage={true} />
                    </Button>
                    <p>{user?.displayName || ""}</p>
                </div>
                <Button onClick={handleLoggingUserOut} styling="font-semibold text-teal-700 hover:text-teal-900 cursor-pointer text-xl disabled:text-teal-300" disabled={isPending}>Log out</Button>
            </div>
            <button className="absolute top-2 left-2 cursor-pointer transition-all duration-200" onClick={handleToggleSidebar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
    </div>
}