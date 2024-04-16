'use client'

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { menusPathState, projectIdState, menuIdState } from "./atoms"
import { updatePage, updateItem, deleteMenuBlock, createMenu, updateValue, deleteValue, copyMenuBlock, getCustomBlocks, useCustomMenuBlock } from "@/app/lib/fetch"
import { Text, Select, Code, Checkbox, SimpleSelect, Number, SimpleText } from "./Inputs"
import { useState, useEffect } from "react"
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import update from 'immutability-helper'
import StyleEditor from "./StyleEditor"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useWindowSize } from 'usehooks-ts'
import { query, collection, where, onSnapshot } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import Media from "./Media";
import Popup from "../ui/Popup";
import Image from "next/image"
import IconInput from "./IconInput"
import PageSelect from "./PageSelect"
import { PiCopySimple } from "react-icons/pi";

const MenuInput = ({ block, parentId }) => {

    const projectId = useRecoilValue(projectIdState)
    const [ editor, setEditor ] = useState('style')
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ blocksPath, setBlocksPath ] = useRecoilState(menusPathState)
    const setBlockId = useSetRecoilState(menuIdState)
    const [ subBlocks, setSubBlocks ] = useState([])
    const [ customBlocks, setCustomBlocks ] = useState([])

    let path = `projects/${projectId}/stages/draft/menus/${block?.id}`
    let parentPath = block ? `projects/${projectId}/stages/draft/menus/${parentId}` : null

    const debounce = (mainFunction, delay) => {
        let timer;
        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            mainFunction(...args);
          }, delay);
        };
      };

    const { height } = useWindowSize()

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

    const updateBlockNav = (action,props) => {
        if(action === 'open') {
            open(props)
        }
        else if(action === 'back'){ 
            setBlocksPath(update(blocksPath, { $splice: [[blocksPath.length-1,1]]}))
            setBlockId(props?.parent)
        }
    }

    const createBlock = async () => {
        const res = await createMenu(projectId,block?.id,block.blocks ? block.blocks.length : 0)
        updateBlockNav('open',{id:res,title:'New Menu Block',parent:block.id})
    }

    const removeBlock = async () => {
        await deleteMenuBlock(projectId,block.id,block.parent)
        updateBlockNav('back', block)
    }

    const reorder = ({source: { index: srcIndex }, destination: { index: destIndex }}) => {
        if(srcIndex !== destIndex){
            const item = subBlocks[srcIndex]
            const reordered = update(subBlocks, { $splice: [[srcIndex,1],[destIndex,0,item]]})
            setSubBlocks(reordered)
            reordered.map((e,i) => {
                updateItem(`projects/${projectId}/stages/draft/menus/${e.id}`, {'order': i})
            })
        }
      }

      useEffect(() => {
        if(block?.id){
            const col = query (collection(db, "projects", projectId, "stages", "draft", "menus" ), where("parent", "==", block.id))
            const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
            return () => unsub()
        }
    }, [ block?.id ])

    useEffect(() => {
        if(querySnap){
            debounce(setSubBlocks(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}).sort((a, b) => a.order - b.order)), 300)
        }
    }, [ querySnap ])

    const [ imageSelect, setImageSelect ] = useState(false)

    const useImage = (e) => {
        updateValue(path,{[`imgProps`]: {
            src: e.url,
            height: '400px',
            width: '100%',
            objectFit: 'contain',
            quality: 75,
            priority: false
        }},parentPath)
        setImageSelect(false)
    }

    useEffect(() => {
        if(block?.type === "custom" && customBlocks?.length === 0){
            const fetch = async () => {
                await getCustomBlocks(projectId).then((data) => setCustomBlocks(data))
            }
            fetch()
        }
        if(block?.imgProps && !block?.imgProps?.src || block?.imgProps && block?.element !== 'Image'){
            deleteValue(path,`imgProps`,parentPath)
        }
        if(blocksPath?.length > 0 && block?.parent === null){
            setBlocksPath([])
        }
        if(block?._id?.length === 0){
            deleteValue(path,`_id`,parentPath)
        }
    }, [ block ])

    const [ iconSelect, setIconSelect ] = useState(false)

    const useIcon = (e) => {
        updateValue(path,{[`iconProps.name`]: e },parentPath)
        setIconSelect(false)
    }

    const [ pageSelect, setPageSelect ] = useState(false)

    const usePage = (e) => {
        updateValue(path,{[`linkProps.href`]: e },parentPath)
        setPageSelect(false)
    }

    
    const [ state, setState ] = useState(null) // static, hover, focus, active

    const states = [
        {name: 'None', value: null},
        {name: 'Hover', value: '_hover'},
        {name: 'Focus', value: '_focus'},
        {name: 'Even', value: '_even'},
        {name: 'Odd', value: '_odd'},
        {name: 'Before', value: '_before'},
        {name: 'After', value: '_after'},
    ]

    let stateProps = block ? block[`${state}`] : null

    return (

        <div className="flex flex-col p-4 grow w-full">
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
                                {name: 'Placeholder', value: 'placeholder'},
                                {name: 'Standard', value: 'standard'},
                                {name: 'Theme', value: 'theme'},
                                {name: 'Widget', value: 'widget'},
                                {name: 'Custom', value: 'custom'},
                            ]}
                        />
                        <SimpleSelect 
                            label="Element"
                            onChange={(e) => {
                                block?.type === "custom" ?
                                useCustomMenuBlock(projectId,e.target.value,block?.order,block?.id,true,block?.id)
                                : updateValue(path,{[`element`]:  e.target.value },parentPath)}
                            }
                            value={block?.element ? 
                                block?.type === "custom" && customBlocks?.length > 0 ?
                                    customBlocks.filter(e => e.id === block?.element)[0]
                                : block?.type === "standard" ?
                                    block?.element
                                    : null
                                : null}
                            placeholder="Select A Block Element"
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
                                            {name: 'Icon', value: 'icon'},
                                        ]
                                    },        
                                    {
                                        group: 'Popovers',
                                        groupOptions: [
                                            {name: 'Popover Wrapper', value: 'Popover'},
                                            {name: 'Popover Trigger', value: 'PopoverTrigger'},
                                            {name: 'Popover Content', value: 'PopoverContent'},
                                            {name: 'Popover Header', value: 'PopoverHeader'},
                                            {name: 'Popover Body', value: 'PopoverBody'},
                                            {name: 'Popover Footer', value: 'PopoverFooter'},
                                            {name: 'Popover Arrow', value: 'PopoverArrow'},
                                            {name: 'Popover Close Button', value: 'PopoverCloseButton'},
                                        ]
                                    }, 
                                    {
                                        group: 'Menus',
                                        groupOptions: [
                                            {name: 'Menu Wrapper', value: 'Menu'},
                                            {name: 'Menu Button', value: 'MenuButton'},
                                            {name: 'Menu List', value: 'MenuList'},
                                            {name: 'Menu Item', value: 'MenuItem'},
                                            {name: 'Menu Item Option', value: 'MenuItemOption'},
                                            {name: 'Menu Group', value: 'MenuGroup'},
                                            {name: 'Menu Option Group', value: 'MenuOptionGroup'},
                                            {name: 'Menu Divider', value: 'MenuDivider'},
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
                                    customBlocks?.length > 0 ? 
                                        customBlocks.map((block) => { return {name: block.title,value: block.id}})
                                    : null
                                : null
                            }
                        />

                        {block?.element === 'internalLink' || block?.element === 'externalLink' || block?.element === 'anchorLink' ?
                            <>
                                <SimpleText
                                    label="Text"
                                    onChange={(e) => updateValue(path,{[`linkProps.text`]: e},parentPath)}
                                    placeholder="Add Link Text"
                                    initialValue={block?.linkProps?.text}
                                />
                                <SimpleText
                                    label="Title"
                                    onChange={(e) => updateValue(path,{[`linkProps.title`]: e},parentPath)}
                                    placeholder="Add An SEO-Friendly Link Title"
                                    initialValue={block?.linkProps?.title}
                                />
                                {pageSelect ?
                                    <Popup title="Select A Page To Link" close={() => setPageSelect(false)}>
                                        <PageSelect
                                            current={block?.linkProps?.href}
                                            set={(e) => usePage(e)}
                                        />
                                    </Popup>
                                : null }
                                {block?.linkProps?.href ?
                                <span>
                                    Linking To Slug: {block?.linkProps?.href}
                                </span>
                                : null }
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => setPageSelect(true)}>
                                        Select A Page
                                    </button>
                                    {block?.linkProps?.href ?
                                        <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-red-600 hover:border-red-600 transition-all duration-200 w-full" type="button" onClick={() => deleteValue(path,`linkProps.href`,parentPath)}>
                                            Remove Page
                                        </button>
                                    : null}
                                </div>
                            </>
                        : null}

                        {block?.element === "icon" ?
                            <>
                                {iconSelect ?
                                    <Popup title="Select An Icon" close={() => setIconSelect(false)}>
                                        <IconInput set={useIcon} current={block?.iconProps?.name} />
                                    </Popup>
                                : null }
                                {block?.iconProps?.name ?
                                <span>
                                    Current Icon: {block?.iconProps?.name?.substring(2)}
                                </span>
                                : null }
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => setIconSelect(true)}>
                                        Select An Icon
                                    </button>
                                    {block?.iconProps?.name ?
                                        <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-red-600 hover:border-red-600 transition-all duration-200 w-full" type="button" onClick={() => deleteValue(path,`iconProps.name`,parentPath)}>
                                            Delete Icon
                                        </button>
                                    : null}
                                </div>
                            </>
                        : null}

                        {block?.element === 'Popover' ?
                            <SimpleSelect 
                                label="Trigger Type"
                                placeholder="Select How The Popover Is Triggered"
                                onChange={(e) => updateValue(path,{['trigger']: e.target.value},parentPath)}
                                value={block?.trigger ? block.trigger : null}
                                options={[
                                    {name: "Click", value: "click"},
                                    {name: "Hover", value: "hover"},
                                ]}
                            />
                        : null}

                        {block?.element === 'Box' || block?.element === 'Heading' || block?.element === 'Text' ?
                            <SimpleSelect 
                                label="Tag"
                                placeholder="Select A Tag To Render The Element As"
                                onChange={(e) => updateValue(path,{[`as`]:  e.target.value },parentPath)}
                                value={block?.as ? block?.as : block?.element === 'Box' ? 'div' : block?.element === 'Heading' ? 'h2' : null}
                                options={
                                    block?.element === "Box" ?
                                        [
                                            {name: 'Div', value: 'div'},
                                            {name: 'Section', value: 'section'},
                                            {name: 'Span', value: 'span'},
                                            {name: 'Article', value: 'article'},
                                            {name: 'Aside', value: 'aside'},
                                            {name: 'Navigation', value: 'nav'},
                                            {name: 'Footer', value: 'footer'},
                                        ]
                                    : block?.element === "Heading" ?
                                        [
                                            {name: 'H1', value: 'h1'},
                                            {name: 'H2', value: 'h2'},
                                            {name: 'H3', value: 'h3'},
                                            {name: 'H4', value: 'h4'},
                                            {name: 'H5', value: 'h5'},
                                            {name: 'H6', value: 'h6'},
                                        ]
                                    : block?.element === "Menu" ?
                                        [
                                            {name: 'Navigation', value: 'nav'},
                                            {name: 'Footer', value: 'footer'},
                                            {name: 'Aside', value: 'aside'},
                                        ]
                                    : block?.element === "Text" ?
                                        [
                                            {name: 'Paragraph', value: 'p'},
                                            {name: 'Span', value: 'span'},
                                            {name: 'Bold', value: 'b'},
                                            {name: 'Italic', value: 'i'},
                                            {name: 'Underline', value: 'u'},
                                            {name: 'I18N', value: 'abbr'},
                                            {name: 'Citation', value: 'cite'},
                                            {name: 'Deleted', value: 'del'},
                                            {name: 'Emphasis', value: 'em'},
                                            {name: 'Inserted', value: 'ins'},
                                            {name: 'Ctrl + C (code)', value: 'kbd'},
                                            {name: 'Highlighted', value: 'mark'},
                                            {name: 'Strikethrough', value: 's'},
                                            {name: 'Sample', value: 'samp'},
                                            {name: 'Subscript', value: 'sub'},
                                            {name: 'Superscript', value: 'sup'},
                                        ]
                                    : []
                                }
                            />
                        : null}

                        {block?.element === "Heading" || block?.element === 'Text' ?
                            <SimpleText
                                label="Text"
                                onChange={(e) => updateValue(path,{[`text`]: e},parentPath)}
                                placeholder="Add Text To The Block"
                                initialValue={block?.text}
                            />
                        : null }

                        {block?.element === "Image" ?
                        <>
                                <div className="flex flex-col space-y-4">
                                <span className='text-sm font-semibold'>Image</span>
                                {block?.imgProps?.src ?
                                    <div className="relative flex flex-col space-y-2 items-center justify-center h-[120px] md:h-[150px] lg:h-[200px] w-full shadow-md rounded-md border border-base-500/50 overflow-hidden">
                                        <Image 
                                            src={block?.imgProps?.src} 
                                            alt="Image" 
                                            quality={75}
                                            sizes="(max-width: 1920px) 400px"
                                            fill
                                            className="object-contain group-hover:scale-110 transition-all duration-300"
                                        />
                                    </div>
                                : null}
                                <div className="grid grid-cols-2 gap-4">
                                <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => setImageSelect(true)}>
                                    Select An Image
                                </button>
                                {block?.imgProps?.src ?
                                <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-red-600 hover:border-red-600 transition-all duration-200 w-full" type="button" onClick={() => deleteValue(path,`imgProps`,parentPath)}>
                                    Delete Image
                                </button>
                                : null}
                                </div>
                                {imageSelect ?
                                <Popup title="Select An Image" close={() => setImageSelect(false)}>
                                    <Media use="Images" set={useImage} />
                                </Popup>
                                : null }
                                </div>
                                {block?.imgProps?.src ?
                                <div className="flex flex-row space-x-4 items-center justify-evenly">          

                                    <Checkbox 
                                        label="Priority" 
                                        onChange={(e) => 
                                            e.target.checked ? 
                                            updateValue(path,{[`imgProps.priority`]: true},parentPath)
                                            : deleteValue(path,`imgProps.priority`,parentPath)
                                        }
                                        value={block?.imgProps?.priority ? block.imgProps.priority : null}
                                    />
                                    <Number 
                                        label="Quality"
                                        min={0}
                                        max={100}
                                        step={1}
                                        defaultVal={75}
                                        value={block?.imgProps?.quality ? block.imgProps.quality : null}
                                        onChange={(val) => updateValue(path,{[`imgProps.quality`]: val },parentPath)}
                                    />
                        
                                <SimpleSelect 
                                    label="Object Fit"
                                    onChange={(e) => e.target.value === 'none' ? deleteValue(path,`imgProps.objectFit`,parentPath) : updateValue(path,{[`imgProps.objectFit`]:  e.target.value },parentPath)}
                                    value={block?.imgProps?.objectFit ? block.imgProps.objectFit : null}
                                    placeholder="Select..."
                                    options={[
                                        {name: 'None', value: 'none'},
                                        {name: 'Contain', value: 'contain'},
                                        {name: 'Cover', value: 'cover'},
                                        {name: 'Fill', value: 'fill'},
                                    ]}
                                />
                            </div>
                            : null}
                            </>
                        : null }

                        <div className={`grid ${block?.element !== 'Image' && block?.element !== "Menu" ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                            {block?.element !== 'Menu' ?
                                <button 
                                    type="button"
                                    onClick={() => setEditor('style')}
                                    className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'style' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                                >
                                    Style
                                </button>
                            : null }
                            {block?.element !== 'Image' ?
                            <button 
                                type="button"
                                onClick={() => setEditor('blocks')}
                                className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'blocks' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                            >
                                Blocks
                            </button>
                            : null }
                            <button 
                                type="button"
                                onClick={() => setEditor('functions')}
                                className={`cursor-pointer text-sm flex flex-row items-center justify-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${editor === 'functions' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                            >
                                Functions
                            </button>
                        </div>

                        {editor === "style" && block.element !== "Menu" ?

                        <SimpleSelect 
                        label="Element State"
                        onChange={(e) => setState(e.target.value === "None" ? null : e.target.value)}
                        placeholder="Select An Element State To Edit"
                        options={states}
                        value={state}
                    />
                    : null}

                        {/* === Style === */}
                        <div className={editor === 'style' && block.element !== "Menu" ? 'flex flex-col grow space-y-4' : 'hidden'}>
                            <StyleEditor 
                                style={block.style} 
                                path={path}
                                type={block.type}
                                element={block.element} 
                                css={block.customCss}
                                parentPath={parentPath}
                                state={state}
                                stateProps={stateProps}
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
        {subBlocks?.length ?
        subBlocks.map((e,i) => {
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
                    <button 
                            title={`Duplicate ${e.title ? e.title : 'Untitled'} Block`} 
                            className="ml-auto text-xl hover:text-brand-500" 
                            type="button" 
                            onClick={() => copyMenuBlock(projectId,e.id,subBlocks.length,block?.id)}
                        >
                            <PiCopySimple />
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
                                {block?.id === parentId ? 'Delete Menu' : 'Delete Block'}
                            </button>
                    </div>
                </>
            :
                <div className="flex flex-col items-center text-center text-sm justify-center grow">Select A Menu To Edit</div>
            }
        </div>
    )

}
export default MenuInput