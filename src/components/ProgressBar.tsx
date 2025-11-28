export default function ({ currentIndex, total }: { currentIndex: number, total: number }) {

    return <div className="relative w-3/4 mx-auto md:ml-auto bg-gray-200 rounded-sm h-5">
        <div style={{ width: `${currentIndex / total * 100}%` }} className="absolute h-5 left-0 bg-emerald-300 rounded-sm"></div>
    </div>
}