'use client'

import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "@wits/next-themes"
import { useState, useEffect } from "react"

export default function ModeToggle () {

    const { theme, setTheme } = useTheme()
    const [ current, setCurrent ] = useState(false)

    useEffect(() => {
        if(theme === 'dark'){
            setCurrent(true)
        }
        else{
            setCurrent(false)
        }
    }, [ theme ]) 

    return (
        <button className="relative ml-auto w-12 h-5 bg-base-300/70 dark:bg-base-700/70 shadow-lg rounded-full" onClick={() => current ? setTheme('light') : setTheme('dark')} title={`Toggle ${!current ? 'Light' : 'Dark'} Mode`}>
            <div className={`absolute top-1/2 -translate-y-1/2 ${theme === "dark" ? 'right-1' : 'left-1'}`}>
                {current ?  <IoMoonOutline /> : <IoSunnyOutline />}    
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-500 transition-all ${theme === 'dark' ? 'left-1' : 'right-1'}`} />
        </button>
    )
}