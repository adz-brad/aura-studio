import { useRecoilValue, useRecoilState } from "recoil"
import { blockState, blockNavState, pageIdState, projectIdState, blocksPathState } from "./atoms"
import { addBlock, updateItem } from "@/app/lib/fetch"
import { IoAdd } from "react-icons/io5"
import update from 'immutability-helper'
import { MdDragIndicator } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; 
import { useEffect } from "react"

const BlockNav = () => {

  const pageId = useRecoilValue(pageIdState)
  const projectId = useRecoilValue(projectIdState)
  const [ list, setList ] = useRecoilState(blockNavState)
  const [ block, setBlock ] = useRecoilState(blockState)
  const [ blocksPath, setBlocksPath ] = useRecoilState(blocksPathState)

  const replaceAtParentIndex = (arr,parent) => {
    return arr.findIndex(e => e.parent === parent)
  }

  useEffect(() => {
    if(!list){ setBlock(null) }
  }, [ list ])

  const open = (props) => {
    const i = replaceAtParentIndex(blocksPath,props.parent)
    if(i === -1){
      setBlocksPath(update(blocksPath, { $push: [{id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null}] }))
    }
    else {
      setBlocksPath(update(blocksPath, { [i]:{ $set: {id:props?.id,title:props?.title,parent:props?.parent ? props.parent : null} } }))
    }
    setBlock({id:props.id,title:props.title,parent:props.parent ? props.parent : null})
  }

  const reorder = ({source: { index: srcIndex }, destination: { index: destIndex }}) => {
    if(srcIndex !== destIndex){
        const item = list[srcIndex]
        const reordered = update(list, { $splice: [[srcIndex,1],[destIndex,0,item]]})
        setList(reordered)
        reordered.map((e,i) => {
            updateItem(`projects/${projectId}/stages/draft/pages/${pageId}/blocks/${e.id}`, {'order': i})
        })
    }
  }

  return (
    <div className="flex flex-col pr-4 space-y-3 overflow-hidden">
      <div className="flex w-full pb-2 border-b border-brand-500 font-semibold text-lg h-[40px]">
        <div className="flex flex-row w-full grow items-center">
            <span className="mx-auto text-sm">Add Block</span>
            <button type="button" onClick={() => addBlock(
              projectId,
              pageId,
              block?.parent ? `projects/${projectId}/stages/draft/pages/${pageId}/blocks/${block?.parent}` : `projects/${projectId}/stages/draft/pages/${pageId}`,
              block?.parent ? block.parent : null, 
              list ? list.length : 0
              )}>
                <IoAdd className="text-green-500 text-xl"/>
            </button>
        </div>
      </div>
      <DragDropContext onDragEnd={reorder}>
      <Droppable droppableId="blocks">
        {(provided) => (
          <ul 
            className="h-full flex flex-col grow space-y-2"
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {list?.length ?
              list.map((e,i) => {
                return (
                  <Draggable key={e.id} draggableId={e.id} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        className={`text-sm flex flex-row items-center space-x-2 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${e.id === block?.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                      >
                        <div 
                          className="group" 
                          
                        {...provided.dragHandleProps}
                        >
                          <MdDragIndicator className="text-xl text-base-700 dark:text-base-500 group-hover:text-base-950 dark:group-hover:text-base-50" />
                        </div>
                        <button className="cursor-pointer py-2 px-3 grow text-left" type="button" disabled={e.id === block?.id} onClick={() => open(e)}>
                          {e.title}
                        </button>
                      </li>
                    )}
                  </Draggable>
              )})
                        
            : 
              <li className="m-auto text-sm text-center">
                Create Your First Block
              </li>
            }
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      </DragDropContext>
    </div>
  )
}
export default BlockNav