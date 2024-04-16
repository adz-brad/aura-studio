import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { projectIdState, pageIdState, blockState, blocksPathState, pageGroupState } from "./atoms"
import { useRef, useEffect, useState } from "react"
import update from 'immutability-helper'

export const RenderWindow = () => {
    const projectId = useRecoilValue(projectIdState)
    const pageId = useRecoilValue(pageIdState)
    const [ block, setBlock ] = useRecoilState(blockState)
    const [ blocksPath, setBlocksPath ] = useRecoilState(blocksPathState)
    const setPageGroup = useSetRecoilState(pageGroupState)
    const [ current, setCurrent ] = useState(null)
    const [ blockNodes, setBlockNodes ] = useState(null)
    const frameRef = useRef(null)

    useEffect(() => {
        if(block){
            setCurrent(block.id)
        }
        if(frameRef?.current && !blockNodes && block?.id !== current){
            setTimeout(() => {
                const doc = frameRef?.current?.contentWindow?.document
                const nodes = doc?.querySelectorAll('[data-blockNode="true"]')
                if(nodes){
                    setBlockNodes(nodes)
                }
            }, 5000)
        }
    }, [ frameRef, block ])

    useEffect(() => {
        if(frameRef?.current){
            const doc = frameRef?.current?.contentWindow?.document
            const nodes = doc?.querySelectorAll('[data-blockNode="true"]')
            if(nodes){
                setBlockNodes(nodes)
            }
        }
    }, [ current ])

    const replaceAtParentIndex = (arr,parent) => {
        return arr.findIndex(e => e.parent === parent)
      }

    const open = (data) => {
        const props = JSON.parse(data.dataset['block'])
        const i = replaceAtParentIndex(blocksPath,props.parent)
        if(i === -1){
          setBlocksPath(update(blocksPath, { $push: [{id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null}] }))
        }
        else {
          setBlocksPath(update(blocksPath, { [i]:{ $set: {id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null} } }))
        }
        setPageGroup('Blocks')
        setBlock({id:props.id,title:props.title,parent:props.parent ? props.parent : null})
      }

    useEffect(() => {
        if(blockNodes){
            blockNodes.forEach((node) => {
                const json = JSON.parse(node.dataset['block'])
                node.addEventListener('click', (e) => open(e.target))
                node.style['cursor'] = 'pointer'
                if(json.id === block?.id){
                    node.style['outline'] = 'dashed rgb(255 255 233 / 30%)'
                    node.style['outline-offset'] = '-4px'
                }
                else {
                    node.style.removeProperty('outline')
                    node.style.removeProperty('outline-offset')
                }
            })
        }
    }, [ blockNodes ])
    
    return (
        <iframe 
            ref={frameRef}
            className="h-full w-full" 
            src={`http://localhost:3000/preview?projectId=${projectId}&pageId=${pageId}`} 
        />
    )
}