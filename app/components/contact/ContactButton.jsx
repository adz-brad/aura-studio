'use client'

import { useState, useRef } from "react"
import { IoChatbubbleEllipsesOutline, IoCloseSharp   } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";
import Submit from "./Submit";

const ContactButton = () => {

    const [ open, setOpen ] = useState(false)

    const contactRef = useRef(null)
    const formRef = useRef(null)

    const handleClickOutside = () => {
        open ? setOpen(false) : null
    }

    useOnClickOutside(contactRef, handleClickOutside)

    return (
        <div 
            ref={contactRef}
            className="absolute bottom-2 right-2"
        >
            <button
                onClick={() => setOpen(!open)}
                title="Contact Us"
                className="bg-base-50/80 dark:bg-base-900/80 p-3 rounded-full group"
            >
                <IoChatbubbleEllipsesOutline 
                    className={`text-4xl group-hover:scale-105 ${open ? 'text-brand-500 hover:text-base-950 dark:hover:text-base-50' : 'text-base-950 dark:text-base-50' } group-hover:text-brand-500 transition-all duration-300`}
                />
            </button>
            <div className={`fixed flex flex-col p-8 w-full max-w-screen-sm h-full max-h-[800px] ${open ? 'top-1/2 -translate-y-1/2' : '-top-full'} left-1/2 -translate-x-1/2  bg-base-50 dark:bg-base-900 transition-all duration-300 shadow-lg rounded-xl`}>
                <div className="flex flex-row items-center">
                    <span
                        className="text-xl font-medium"
                    >
                        Contact Us
                    </span>
                    <button 
                        onClick={() => setOpen(false)}
                        className="ml-auto text-xl"
                    >
                    <IoCloseSharp  />
                    </button>
                </div>
                <form 
                    ref={formRef}
                    action={console.log('')}
                    className="flex flex-col space-y-8 py-4 justify-center grow"
                >
                    <div className="flex flex-col">
                        <label 
                            htmlFor="name"
                            className="text-sm font-medium"
                        >
                            Your Name
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label 
                            htmlFor="message"
                            className="text-sm font-medium"
                        >
                            How Can We Help?
                        </label>
                        <textarea 
                            name="message" 
                            id="message" 
                            rows={4}
                        />
                    </div>

                    <Submit />
                </form>
            </div>
        </div>
  )
}
export default ContactButton