import { useState, useEffect } from "react"
import { query, onSnapshot, collection, where } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import { useRecoilValue, useRecoilState } from "recoil"
import { menuIdState, projectIdState } from "./atoms"
import { copyMenuBlock } from "@/app/lib/fetch"
import { PiCopySimple } from "react-icons/pi"

const MenusNav = () => {

    const projectId = useRecoilValue(projectIdState)
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ menus, setMenus ] = useState(null)
    const [ menuId, setMenuId ] = useRecoilState(menuIdState)

    useEffect(() => {
        if(projectId && !querySnap){
            const col = query (collection(db, "projects", projectId, "stages", "draft", "menus"), where("isParent", "==", true))
            const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
            return () => unsub()
        }
    }, [ projectId ])

    useEffect(() => {
        if(querySnap){
            setMenus(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
        }
    }, [ querySnap ])

    useEffect(() => {
        if(menus && !menuId){
            setMenuId(menus[0]?.id)
        }
    }, [ menus ])

    return (
        <ul className="flex flex-col grow space-y-2 py-1">
            {menus?.map((e) => {
                return (
                    <li 
                        title={e.name}
                        key={e.id}
                        as="button" 
                        onClick={() => setMenuId(e.id)}
                        className={`cursor-pointer text-sm flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${menuId === e.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                    >
                        {e.title ? e.title : "Untitled"}
                        <button 
                            title={`Duplicate ${e.title ? e.title : 'Untitled'} Block`} 
                            className="ml-auto text-xl hover:text-brand-500" 
                            type="button" 
                            onClick={() => copyMenuBlock(projectId,e.id,menus.length)}
                        >
                            <PiCopySimple />
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
export default MenusNav