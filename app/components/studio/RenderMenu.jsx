import { RenderBlock } from '@/app/lib/render'
import { doc, onSnapshot, getDoc } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import { useEffect, useState } from 'react'

const RenderMenu = ({ projectId, menuId }) => {

  const [ blocks, setBlocks ] = useState(null)
  const [ renderBlocks, setRenderBlocks ] = useState(null)

  useEffect(() => {
    if(projectId && menuId){
      const unsub = onSnapshot(doc(db, "projects", projectId, "stages", "draft", "menus", menuId), (doc) => setBlocks([{id: doc.id, ...doc.data()}]))
      return () => unsub()
    }   
  }, [ projectId, menuId ])

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
export default RenderMenu