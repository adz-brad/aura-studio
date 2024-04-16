import { useState } from "react";
import { MdOutlineDocumentScanner, MdOutlinePermMedia } from "react-icons/md";
import { VscEditorLayout } from "react-icons/vsc";
import { 
    IoSettingsOutline, 
    IoNavigateOutline, 
    IoColorPaletteOutline, 
    IoAppsSharp, 
    IoCaretForwardCircleOutline, 
    IoLogoRss, 
    IoAnalyticsOutline,
    IoCubeOutline 
} from "react-icons/io5";
import { displayState } from "./atoms";
import { useRecoilState } from "recoil";

const StudioNav = () => {

    const buttons = [
        {
            title: "Dashboard",
            icon: IoAppsSharp,
        },
        {
            title: "Pages",
            icon: MdOutlineDocumentScanner,
        },
        {
            title: "Blog",
            icon: IoLogoRss,
        },
        {
            title: "Menus",
            icon: IoNavigateOutline,
        },
        {
            title: "Media",
            icon: MdOutlinePermMedia,
        },
        {
            title: "Templates",
            icon: VscEditorLayout
        },
        {
            title: "Blocks",
            icon: IoCubeOutline
        },
        {
            title: "Theme",
            icon: IoColorPaletteOutline,
        },
        {
            title: "Performance",
            icon: IoAnalyticsOutline,
        },
        {
            title: "Settings",
            icon: IoSettingsOutline,
        },
    ]

    const [ expand, setExpand ] = useState(false)
    const [ display, setDisplay ] = useRecoilState(displayState)

    return (
        <div className="flex flex-col px-3 pt-2">
            {buttons.map((button) => {
                return (
                    <button
                        key={button.title}
                        title={button.title}
                        onClick={() => setDisplay(button.title)}
                        className={`flex flex-row space-x-4 my-2 group ${display === button.title ? 'text-brand-500' : 'text-inherit'}`}
                    >
                        <button.icon className="text-2xl group-hover:text-brand-500"/>
                        {expand && <span className={`text-sm ${display == button.title ? 'font-semibold':'font-light'}`}>{button.title}</span>}
                    </button>
                )
            })}
            <button
                title={expand ? 'Collapse' : 'Expand'}
                onClick={() => setExpand(!expand)}
                className={`flex flex-row items-center mt-auto ${expand ? 'space-x-2' : 'mx-auto -translate-x-1'} group`}
            >
                <IoCaretForwardCircleOutline className={`text-2xl group-hover:text-brand-500 transition-all duration-200 ${expand ? 'rotate-180' : 'rotate-0'}`}/>
                {expand && <span className="text-sm">{expand ? 'Collapse' : 'Expand'}</span>}
            </button>
        </div>
    )
}

export default StudioNav