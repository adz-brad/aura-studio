import { collection, query, orderBy, onSnapshot, getDoc } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import BlockEditor from "./BlockEditor"
import BlockNav from "./BlockNav"
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { projectIdState, pageIdState, blockNavState, renderState, subBlocksNavState, blocksPathState, blockState } from "./atoms"
import Split from "react-split"

const Blocks = () => {

    const projectId = useRecoilValue(projectIdState)
    const pageId = useRecoilValue(pageIdState)
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ blocks, setBlocks ] = useState(null)
    const setBlockNav = useSetRecoilState(blockNavState)
    const setRenderBlocks = useSetRecoilState(renderState)
    const [ blockList, setBlockList ] = useState(null)
    const setSubBlockNav = useSetRecoilState(subBlocksNavState)
    const setBlocksPath = useSetRecoilState(blocksPathState)
    const block = useRecoilValue(blockState)

    const debounce = (mainFunction, delay) => {
        let timer;
        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            mainFunction(...args);
          }, delay);
        };
      };

    useEffect(() => {
            if(projectId && pageId){
                const col = query (collection(db, "projects", projectId, "stages", "draft", "pages", pageId, "blocks" ), orderBy("order", "asc"))
                const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
                return () => unsub()
            }   
    }, [ projectId, pageId ])

    useEffect(() => {
        if(querySnap){
            debounce(setBlocks(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}})), 300)
        }
    }, [ querySnap ])

    useEffect(() => {
        if(blocks?.length){
                if(block){
                    const filter = blocks?.filter(e => e.parent === block.parent)
                    setBlockNav(filter.map(e => { return { id: e.id, title: e.title ? e.title : e.element ? e.element : 'Untitled', parent: e.parent ? e.parent : null }}))
                    const subBlocksFilter = blocks?.filter(e => e.parent === block.id)
                    setSubBlockNav(subBlocksFilter.map(e => { return { id: e.id, title: e.title ? e.title : e.element ? e.element : 'Untitled', parent: e.parent, order: e.order}}))
                }
                else {
                    setBlocksPath([])
                    const filter = blocks?.filter(e => e.parent === null)
                    setBlockNav(filter.map(e => { return { id: e.id, title: e.title ? e.title : e.element ? e.element : 'Untitled', parent: e.parent ? e.parent : null }}))
                    setSubBlockNav(null)
                }
        }
        else {
            setBlocksPath([])
            setBlockNav(null)
        }
    }, [ pageId, blocks, block ])

    useEffect(() => {
        setBlockNav(null)
    }, [ pageId ])


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
                setBlockList(flatList)
            }
            fetch(blocks)
          }
        
    }, [ blocks ])
    

    return (
        <Split
            className="split max-w-full"
            sizes={[35,65]}
            //minSize={480}
            gutterSize={2}
        >
            <BlockNav />
            <BlockEditor blocks={blockList} />
        </Split>
    )

}

export default Blocks