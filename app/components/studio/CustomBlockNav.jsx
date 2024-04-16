import { useState, useEffect } from "react"
import { query, onSnapshot, collection, orderBy, where } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import { useRecoilValue, useRecoilState } from "recoil"
import { customBlockIdState, projectIdState } from "./atoms"
import { copyCustomBlock } from "@/app/lib/fetch"
import { PiCopySimple } from "react-icons/pi";

const CustomBlockNav = () => {

    const projectId = useRecoilValue(projectIdState)
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ blocks, setBlocks ] = useState(null)
    const [ blockId, setBlockId ] = useRecoilState(customBlockIdState)

    useEffect(() => {
        if(projectId && !querySnap){
            const col = query(collection(db, "projects", projectId, "stages", "draft", "customBlocks"), where("isParent", "==", true))
            const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
            return () => unsub()
        }
    }, [ projectId ])

    useEffect(() => {
        if(querySnap){
            setBlocks(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
        }
    }, [ querySnap ])

    useEffect(() => {
        if(blocks && !blockId){
            setBlockId(blocks[0]?.id)
        }
    }, [ blocks ])

    return (
        <ul className="flex flex-col grow space-y-2 py-1">
            {blocks?.map((e) => {
                return (
                    <li 
                        title={e.title}
                        key={e.id}
                        as="button" 
                        onClick={() => setBlockId(e.id)}
                        className={`cursor-pointer text-sm flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${blockId === e.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                    >
                        {e.title ? e.title : "Untitled"}
                        <button 
                            title={`Duplicate ${e.title ? e.title : 'Untitled'} Block`} 
                            className="ml-auto text-xl hover:text-brand-500" 
                            type="button" 
                            onClick={() => copyCustomBlock(projectId,e.id,blocks.length)}
                        >
                            <PiCopySimple />
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
export default CustomBlockNav