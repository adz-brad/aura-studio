import { useState, useEffect } from "react"
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import { useRecoilValue } from "recoil"
import { projectIdState } from "./atoms"

const PageSelect = ({ current, set }) => {

    const projectId = useRecoilValue(projectIdState)
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ pages, setPages ] = useState(null)

    useEffect(() => {
        if(projectId && !querySnap){
            const col = query(collection(db, "projects", projectId, "stages", "draft", "pages"), orderBy("updated", "desc"))
            const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
            return () => unsub()
        }
    }, [ projectId ])

    useEffect(() => {
        if(querySnap){
            setPages(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
        }
    }, [ querySnap ])


    return (
        <ul className="flex flex-col grow space-y-2 py-1">
            {pages?.map((e) => {
                return (
                    <li 
                        title={e.name}
                        key={e.id}
                        as="button" 
                        onClick={() => set(e.slug)}
                        className={`cursor-pointer text-sm flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${current === e.slug ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                    >
                        {e.name ? e.name : "Untitled"}
                    </li>
                )
            })}
        </ul>
    )
}
export default PageSelect