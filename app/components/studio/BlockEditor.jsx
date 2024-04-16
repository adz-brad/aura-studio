import { useRecoilState, useRecoilValue } from "recoil"
import { blockState, blocksPathState, pageIdState, projectIdState, subBlocksNavState } from "./atoms"
import { addBlock, updatePage, updateItem, deleteBlock } from "@/app/lib/fetch"
import { Text, Select, Code } from "./Inputs"
import { useState, useEffect } from "react"
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import update from 'immutability-helper'
import StyleEditor from "./StyleEditor"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useWindowSize } from 'usehooks-ts'
import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "@/app/lib/firebase"

const BlockEditor = ({ blocks }) => {

    const pageId = useRecoilValue(pageIdState)
    const projectId = useRecoilValue(projectIdState)
    const [ blockData, setBlockData ] = useRecoilState(blockState)
    const [ block, setBlock ] = useState(null)
    const [ editor, setEditor ] = useState('style')
    const [ subBlocksNav, setSubBlocksNav ] = useRecoilState(subBlocksNavState)
    const [ blocksPath, setBlocksPath ] = useRecoilState(blocksPathState)
    const [ customBlocks, setCustomBlocks ] = useState(null)

    let path = `projects/${projectId}/stages/draft/pages/${pageId}/blocks/${block?.id}`

    const { height } = useWindowSize()

    useEffect(() => {
        if(blockData){
            setBlock(blocks?.filter(e => e.id === blockData?.id)[0])
        }
        else {
            setBlock(null)
        }
    }, [ blocks, blockData ])

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
        setBlockData({id:props.id,title:props.title,parent:props.parent ? props.parent : null})
      }

    const updateBlockNav = (action,props) => {
        if(action === 'open') {
            open(props)
        }
        else if(action === 'back'){ 
            setBlocksPath(update(blocksPath, { $splice: [[blocksPath.length-1,1]]}))
            const filter = blocksPath.filter(e => e.id === props.parent)[0]
            setBlockData({id:filter?.id,title:filter?.title,parent:filter?.parent ? filter.parent : null})
        }
    }

    const createBlock = async () => {
        const res = await addBlock(projectId,pageId,path,block?.id,block.blocks ? block.blocks.length : 0)
        updateBlockNav('open',{id:res,title:'New Block',parent:block.id})
    }

    const removeBlock = async () => {
        await deleteBlock(projectId,pageId,block.id,block.parent)
        updateBlockNav('back', block)
    }

    const reorder = ({source: { index: srcIndex }, destination: { index: destIndex }}) => {
        if(srcIndex !== destIndex){
            const item = subBlocksNav[srcIndex]
            const reordered = update(subBlocksNav, { $splice: [[srcIndex,1],[destIndex,0,item]]})
            setSubBlocksNav(reordered)
            reordered.map((e,i) => {
                updateItem(`projects/${projectId}/stages/draft/pages/${pageId}/blocks/${e.id}`, {'order': i})
            })
        }
      }

      useEffect(() => {
        if(!customBlocks){
            const fetch = async () => {
                const q = query(collection(db, "projects", projectId, "stages", "draft", "customBlocks"), where("isParent", "==", true))
                const docs = await getDocs(q)
                let blocks = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    blocks.push({name: data.title, value: doc.id })
                })
                setCustomBlocks(blocks)
            }
            fetch()
        }
      }, [ pageId ]) 

    return (
        <div className="flex flex-col pt-4 pl-4 grow w-full">
            {block ?
                <>
                    <div className="flex flex-col grow space-y-6 overflow-y-auto overflow-x-hidden mb-4 pr-2 twScroll" style={{height: height-262}}>
                        <Text
                            label="Title "
                            path={path}
                            _key="title"
                            onChange={updatePage}
                            placeholder="Add A Title For This Block"
                            initialValue={block?.title}
                        />
                        <Text
                            label="ID"
                            path={path}
                            _key="_id"
                            onChange={updatePage}
                            placeholder="Add A Custom ID For This Block"
                            initialValue={block?._id}
                        />
                        <Select 
                            label="Type"
                            path={path}
                            _key="type"
                            onChange={updatePage}
                            placeholder="Select A Block Type"
                            value={block?.type}
                            options={[
                                {name: 'Standard', value: 'standard'},
                                {name: 'Theme', value: 'theme'},
                                {name: 'Widget', value: 'widget'},
                                {name: 'Custom', value: 'custom'},
                            ]}
                        />
                        <Select 
                            label="Element"
                            path={path}
                            _key="element"
                            onChange={updatePage}
                            placeholder="Select A Block Element"
                            value={block?.element}
                            options={
                                block?.type === "standard" ?
                                [
                                    {
                                        group: 'Layout',
                                        groupOptions: [
                                            {name: 'Box', value: 'Box'},
                                            {name: 'Card', value: 'Card' },
                                            {name: 'List', value: 'List'},
                                            {name: "Divide", value: "Divide"},
                                            {name: "Table", value: "Table"},
                                            //{name: "Rich Text", value: "Rich Text"}
                                        ]
                                    },      
                                    {
                                        group: 'Typography',
                                        groupOptions: [
                                            {name: 'Heading', value: 'Heading'},
                                            {name: 'Text', value: 'Text'},
                                        ]
                                    },     
                                    {
                                        group: 'Links',
                                        groupOptions: [
                                            {name: 'Internal Link', value: 'internalLink'},
                                            {name: 'External Link', value: 'externalLink'},
                                            {name: 'Anchor Link', value: 'anchorLink'},
                                        ]
                                    },      
                                    {
                                        group: 'Media',
                                        groupOptions: [
                                            {name: 'Image', value: 'Image'},
                                            //{name: 'Video', value: 'video'},
                                            //{name: 'Avatar', value: 'avatar'},
                                            //{name: 'Icon', value: 'icon'},
                                        ]
                                    },              
                                    {
                                        group: 'Forms',
                                        groupOptions: [
                                            {name: 'Form Wrapper', value: 'Form'},
                                            {name: 'Input', value: 'input'},
                                            {name: 'Text Area', value: 'textarea'},
                                            {name: 'Select', value: 'select'},
                                            {name: 'Radio', value: 'radio'},
                                            {name: 'Checkbox', value: 'checkbox'},
                                            {name: 'Slider', value: 'slider'},
                                            {name: 'Range', value: 'range'},
                                            {name: 'Switch', value: 'switch'},
                                            {name: 'Button', value: 'button'},
                                        ]
                                    },                              
                                ]
                                : block?.type === "theme" ?
                                []
                                : block?.type === "widget" ?
                                []
                                : block?.type === "custom" ?
                                customBlocks?.length > 0 ? customBlocks?.map((block) => block) : []
                                : block?.type === "placeholder" ?
                                []
                                : null
                            }
                        />

                        {block?.element === 'internalLink' || block?.element === 'externalLink' || block?.element === 'anchorLink' ?
                            <LinksInput 
                                element={block?.element}
                            />
                        : null}

                        {block?.type === 'box' ?
                            <Select 
                                label="Tag"
                                path={path}
                                _key="as"
                                onChange={updatePage}
                                placeholder="Select A Container Tag To Render The Box As"
                                value={block?.as}
                                options={[
                                    {name: 'Div', value: 'div'},
                                    {name: 'Section', value: 'section'},
                                    {name: 'Span', value: 'span'},
                                    {name: 'Article', value: 'article'},
                                    {name: 'Aside', value: 'aside'},
                                    {name: 'Navigation', value: 'nav'},
                                ]}
                            />
                        : null}

                        <div className="grid grid-cols-3 gap-3">
                            <button 
                                type="button"
                                onClick={() => setEditor('blocks')}
                                className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'blocks' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                            >
                                Blocks
                            </button>
                            <button 
                                type="button"
                                onClick={() => setEditor('style')}
                                className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'style' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                            >
                                Style
                            </button>
                            <button 
                                type="button"
                                onClick={() => setEditor('functions')}
                                className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'functions' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                            >
                                Functions
                            </button>
                        </div>

                        {/* === Style === */}
                        <div className={editor === 'style' ? 'flex flex-col grow space-y-4' : 'hidden'}>
                            <StyleEditor 
                                style={block.style} 
                                path={path}
                                type={block.type}
                                element={block.element} 
                                css={block.customCss}
                            />
                        </div>

                        {/* === Content === */}
                        <div className={editor === 'blocks' ? 'flex flex-col space-y-2 grow' : 'hidden'}>

                            <button 
                                type="button"
                                onClick={() => createBlock()}
                                className="text-sm flex flex-row items-center space-x-2 rounded-md hover:shadow-md hover:bg-green-600/70 bg-base-50 dark:bg-base-900 py-2 px-3 justify-center"
                            >
                                Add Block
                            </button>
                            <DragDropContext onDragEnd={reorder}>
                            <Droppable droppableId="blocks">
                                {(provided) => (
                                <ul 
                                    className="h-full flex flex-col grow space-y-2"
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                >
                                    {subBlocksNav?.length ?
                                    subBlocksNav.map((e,i) => {
                                        return (
                                        <Draggable key={e.id} draggableId={e.id} index={i}>
                                            {(provided) => (
                                            <li
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                className={`text-sm flex flex-row items-center space-x-2 rounded-md hover:shadow-md bg-base-200/70 bg-base-700/70 ${e.id === block?.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
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
                                    null
                                    }
                                    {provided.placeholder}
                                </ul>
                                )}
                            </Droppable>
                            </DragDropContext>

                        </div>

                        {/* === Functions === */}
                        <div className={editor === 'functions' ? 'block' : 'hidden'}>
                            <Code
                                placeholder="Enter Custom Javascript For This Block."
                                onChange={updatePage}
                                path={path}
                                value={block?.js}
                                _key="js"
                                label="Custom Javascript"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-auto">
                    {block?.parent !== null ?
                    <button
                        type="button"
                        title="Previous Block"
                        onClick={() => updateBlockNav('back',block)}
                        className="flex flex-row items-center space-x-2 group w-fit text-sm mr-auto"
                    >
                        <IoCaretForwardCircleOutline className="text-2xl group-hover:text-brand-500 transition-all duration-200 rotate-180"/>
                        <span>Back</span>
                    </button>
                    : null }
                                        <button 
                                type="button"
                                onClick={() => removeBlock()}
                                className="text-sm flex flex-row items-center space-x-2 rounded-md hover:shadow-md hover:bg-red-600 hover:text-base-50 bg-base-50 dark:bg-base-900 py-2 px-3 justify-center ml-auto"
                            >
                                Delete Block
                            </button>
                    </div>
                </>
            :
                <div className="flex flex-col items-center text-center text-sm justify-center grow">Select A Block To Edit</div>
            }
        </div>
    )

}
export default BlockEditor