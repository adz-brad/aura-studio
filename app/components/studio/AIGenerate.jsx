import { IoColorWandOutline, IoHelpCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { generateString } from '@/app/lib/openai';
import { useState } from "react";

const AIGenerate = ({title, prompt, update, path, name, useInput }) => {
    
    const [ open, setOpen ] = useState(false)
    const [ input, setInput ] = useState('')
    const [ choices, setChoices ] = useState([])
    const [ choice, setChoice ] = useState(null)

    const useOpenAi = async (val) => {
        const res = await generateString(`${prompt} ${val}`)
        setChoices(res)
        setChoice({_key: 0, val: res[0]})
    }

    const close = () => {
        setOpen(false)
        setInput('')
        setChoices([])
        setChoice(null)
    }

    const set = async () => {
        await update(path,{[name]:choice.val})
        close()
    }

    return (
        <div className="relative">
            {open ?
                <div className="flex flex-col space-y-4 absolute top-1/2 min-w-[400px] -translate-y-1/4 right-0 translate-x-8 left-0 z-50 bg-base-50 dark:bg-base-900 shadow-lg rounded-md w-fit h-fit p-4">
                    <div className="relative flex flex-row items-center space-x-2">
                        <span className="font-bold text-brand-500 cursor-default">{title}</span>
                        <div className="group">
                            <IoHelpCircleOutline className="cursor-pointer text-2xl"/>
                            <span className="hidden group-hover:block absolute bg-base-50 dark:bg-base-950 w-full top-0 left-[calc(50%-20px)] -translate-x-1/2 -translate-y-[calc(100%+25px)] text-xs p-4">
                                To use AI to generate content, type in a brief, descriptive subject and just click Go! Choose one of the 4 responses and click update. Or click regenerate to get a new set. It's that easy! For SEO, content is generated based on your page details.
                            </span>
                        </div>
                        <div className="grow">
                            <IoCloseCircleOutline as="button" onClick={() => close()} className="ml-auto cursor-pointer text-2xl hover:text-red-500"/>
                        </div>
                    </div>
                    {useInput ?
                        <div className='flex flex-col pageInput'>
                            <div className="flex flex-col space-y-1">
                                <label className='text-sm font-semibold'>
                                    Subject
                                </label>
                                <div className="flex flex-row items-center space-x-3">
                                    <input 
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="grow"
                                    />
                                    <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => useOpenAi(input)}>{choices?.length ? 'Regenerate' : 'Go!'}</button>
                                </div>
                            </div>
                        </div>
                    :
                        <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => useOpenAi()}>{choices?.length ? 'Regenerate' : 'Go!'}</button>
                    }
                    {choices?.length ?
                        <div className="flex flex-col space-y-4 py-2">
                           <ul className="flex flex-col space-y-2">
                                {choices.map((c, i) => {
                                    return (
                                        <li className="flex flex-row items-center space-x-3" key={i}>
                                            <input
                                                type="radio"
                                                name={`Choice ${i+1}`}
                                                value={c}
                                                id={`Choice ${i+1}`}
                                                checked={choice?._key === i}
                                                onChange={(e) => setChoice({_key: i, val: e.target.value})}
                                            />
                                            <label className="text-xs" htmlFor={`Choice ${i+1}`}>{c}</label>
                                        </li>
                                    )
                                })}
                           </ul>
                           <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => set()}>Update</button>
                        </div>
                    : null}
                </div>
            : 
                <button 
                    type="button" 
                    title={title} 
                    onClick={() => setOpen(true)}
                    className="hover:text-brand-500"
                >
                    <IoColorWandOutline className='text-2xl'/>
                </button>
            }
        </div>
    )
}
export default AIGenerate