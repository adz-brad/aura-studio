import { IoMdClose } from "react-icons/io";

const Popup = ({ title, close, children }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-base-50/70 dark:bg-base-950/70 z-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-base-100 dark:bg-base-900 rounded-md shadow-lg w-full h-full max-w-screen-lg max-h-[800px] z-50">
            <div className="flex flex-row items-center pb-4 border-b border-base-500">
                <span className="text-xl font-medium leading-none">
                    {title}
                </span>
                <button 
                    title="Close"
                    type="button"
                    className="group ml-auto"
                    onClick={close}
                >
                    <IoMdClose className="text-2xl group-hover:text-red-500"/>
                </button>
            </div>
            <div className="h-[calc(100%-88px)] w-full overflow-y-auto pt-4">
                {children}
            </div>
        </div>
    </div>
  )
}
export default Popup