import { loader } from "../assets";

export function Loader() {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-black/70
        flex justify-center items-center flex-col">
            <img src={loader} alt="loader" className="w-[40px] h-[100px] object-contain" />
            <p className="mt-[20px] font-epilogue font-bold text-white text-[20px] text-center">
                Transaction is in progress <br/>Please wait...
            </p>
        </div>
    )
}