import Button from "./Button";

export default function Sidebar({ isOpen, handleToggleSidebar }: { isOpen: boolean, handleToggleSidebar: () => void }) {

    let styling = "absolute block md:hidden h-[100vh] w-1/1 bg-[rgba(191,233,223,.7)] top-0 right-0 transition-all duration-200 ";
    if (isOpen) {
        styling += "translate-x-[0]";
    } else {
        styling += "translate-x-[100%]";
    }

    return <div className={styling}>
        <Button>Log out</Button>
        <button onClick={handleToggleSidebar}>Close</button>
    </div>
}