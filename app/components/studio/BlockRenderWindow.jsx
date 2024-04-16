import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { projectIdState, customBlockIdState, customBlocksPathState } from "./atoms"
import { useRef, useEffect, useState } from "react"
import update from 'immutability-helper'

export const BlockRenderWindow = ({ block }) => {

    const projectId = useRecoilValue(projectIdState)
    const setBlockId = useSetRecoilState(customBlockIdState)
    const [ blocksPath, setBlocksPath ] = useRecoilState(customBlocksPathState)
    const [ current, setCurrent ] = useState(null)
    const [ blockNodes, setBlockNodes ] = useState(null)
    const frameRef = useRef(null)

    useEffect(() => {
        if(block?.id){
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
    }, [ frameRef, block, ])

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

      const open = (props) => {
        const i = replaceAtParentIndex(blocksPath,props.parent)
        if(i === -1){
          setBlocksPath(update(blocksPath, { $push: [{id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null}] }))
        }
        else {
          setBlocksPath(update(blocksPath, { [i]:{ $set: {id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null} } }))
        }
        setBlockId(props.id)
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
            src={`http://localhost:3000/block-render?projectId=${projectId}&blockId=${block}`} 
        />
    )
}