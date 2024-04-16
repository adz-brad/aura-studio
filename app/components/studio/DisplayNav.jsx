import { useRecoilValue } from "recoil"
import { displayState, projectIdState } from "./atoms"
import { MdOutlineDocumentScanner } from "react-icons/md";
import { 
    IoAdd,
    IoSettingsOutline, 
    IoNavigateOutline, 
    IoColorPaletteOutline, 
    IoAppsSharp, 
    IoCaretForwardCircleOutline, 
    IoLogoRss, 
    IoAnalyticsOutline,
    IoCubeOutline 
} from "react-icons/io5";
import { createMenu, createPage, createCustomBlock } from "@/app/lib/fetch";
import Pages from "./Pages";
import ThemeNav from "./ThemeNav";
import { useState } from "react";
import MediaNav from "./MediaNav";
import CustomBlockNav from "./CustomBlockNav";
import MenusNav from "./MenusNav";

const DisplayNav = () => {

    const display = useRecoilValue(displayState)
    const projectId = useRecoilValue(projectIdState)
    const [ expand, setExpand ] = useState(true)

    return (
        display !== "Dashboard" &&
            <div className={`relative flex flex-col pt-2 px-4 grow ${expand ? 'max-w-[300px]' : 'max-w-[48px]'} overflow-hidden`}>
                <div className={`flex w-full pb-2 ${expand ? 'border-b border-brand-500 h-[40px]' : 'border-none'} font-semibold text-lg`}>
                    {display === "Pages" ? 
                        <div className={`flex ${expand ? 'flex-row' : 'flex-col space-y-2 pt-2'} w-full grow items-center`}>
                            <MdOutlineDocumentScanner className="text-base-700 dark:text-base-300 text-xl"/>
                            <span className={`ml-2 mr-auto ${expand ? 'block' : 'hidden'}`}>Pages</span>
                            <button onClick={() => createPage(projectId)} title="Add A New Page">
                                <IoAdd className="text-green-500 text-xl"/>
                            </button>
                        </div>
                    : display === "Blocks" ?
                        <div className={`flex ${expand ? 'flex-row' : 'flex-col space-y-2 pt-2'} w-full grow items-center`}>
                            <IoCubeOutline className="text-base-700 dark:text-base-300 text-xl"/>
                            <span className={`ml-2 mr-auto ${expand ? 'block' : 'hidden'}`}>Blocks</span>
                            <button onClick={() => createCustomBlock(projectId)} title="Add A New Custom Block">
                                <IoAdd className="text-green-500 text-xl"/>
                            </button>
                        </div>
                    : display === "Menus" ? 
                        <div className={`flex ${expand ? 'flex-row' : 'flex-col space-y-2 pt-2'} w-full grow items-center`}>
                            <IoNavigateOutline className="text-base-700 dark:text-base-300 text-xl"/>
                            <span className={`ml-2 mr-auto ${expand ? 'block' : 'hidden'}`}>Menus</span>
                            <button onClick={() => createMenu(projectId)} title="Add A New Menu">
                                <IoAdd className="text-green-500 text-xl"/>
                            </button>
                        </div>
                    : display }
                </div>
                <div className={`relative pt-4 grow overflow-y-auto overflow-x-hidden w-full ${expand ? 'block' : 'hidden'}`}>
                    { display === "Pages" && <Pages/>}
                    { display === "Blog" && "Blog" }
                    { display === "Menus" && <MenusNav /> }
                    { display === "Media" && <MediaNav /> }
                    { display === "Theme" && <ThemeNav/> }
                    { display === "Blocks" && <CustomBlockNav /> }
                    { display === "Settings" && "Settings" }
                    { display === "Performance" && "Performance" }
                </div>
                <button
                title={expand ? `Collapse ${display}` : `Expand ${display}`}
                onClick={() => setExpand(!expand)}
                className={`flex flex-row items-center mt-auto ${expand ? 'space-x-2 mr-auto' : '-translate-x-1 mx-auto'} group w-fit`}
            >
                <IoCaretForwardCircleOutline className={`text-2xl group-hover:text-brand-500 transition-all duration-200 ${expand ? 'rotate-180' : 'rotate-0'}`}/>
                {expand && <span className="text-sm">{expand ? `Collapse ${display}` : `Expand ${display}`}</span>}
            </button>
            </div>
    )
}
export default DisplayNav