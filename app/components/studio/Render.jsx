import { RenderBlock } from '@/app/lib/render'
import { collection, doc, query, orderBy, onSnapshot, getDoc } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import { useEffect, useState } from 'react'

const Render = ({ projectId, pageId, blockId }) => {

  const [ querySnap, setQuerySnap ] = useState(null)
  const [ blocks, setBlocks ] = useState(null)
  const [ renderBlocks, setRenderBlocks ] = useState(null)

  useEffect(() => {
    if(projectId && pageId){
        const col = query(collection(db, "projects", projectId, "stages", "draft", "pages", pageId, "blocks" ), orderBy("order", "asc"))
        const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
        return () => unsub()
    }   
    else if(projectId && blockId){
      const unsub = onSnapshot(doc(db, "projects", projectId, "stages", "draft", "customBlocks", blockId), (doc) => setBlocks([{id: doc.id, ...doc.data()}]))
      return () => unsub()
  }   
  }, [ projectId, pageId, blockId ])

  useEffect(() => {
    if(querySnap){
        setBlocks(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
    }
  }, [ querySnap ])

  useEffect(() => {
      if(blocks){
        let flatList = []
        const fetchChildren = async (arr) => {
          return await Promise.all(arr.map(async(block) => {
            const doc = await getDoc(block)
            const data = {id: doc.id, ...doc.data()}
            flatList.push(data)
            const { blocks: children, ...rest } = data
            return {
              ...rest,
              blocks: children ? await fetchChildren(children) : null
            }
          }))
        }
        const fetch = async (arr) => {
            const parents = arr.filter(e => e.parent === null)
            const res = await Promise.all(parents.map(async(block) => {
                flatList.push(block)
                const { blocks: children, ...rest } = block
                return {
                    ...rest,
                    blocks: children ? await fetchChildren(children) : null
                  }
            }))
            setRenderBlocks(res)
        }
        fetch(blocks)
      }
  }, [ blocks ])

  return (
    <>
      {renderBlocks?.map((e) => {
        return (RenderBlock(e))
      })}
    </>
  )
}
export default Render