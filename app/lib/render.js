import { createElement } from "react"
import { 
    Box,
    Card,
    List,
    Divider,
    Table,
    FormControl,
    Heading,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import DrawerState from "../components/chakra/DrawerState"
import RenderImage from "../components/media/RenderImage"
import InternalLink from "../components/chakra/InternalLink"

import PlaceholderImg from '../assets/images/placeholder-image.jpg'
import CustomIcon from "../components/chakra/CustomIcon"

export const dynamic = 'force-dynamic'

const useElement = (e) => {
    if(e === 'Box'){ return Box }
    if(e === 'Card'){ return Card }
    if(e === 'List'){ return List }
    if(e === 'Divide'){ return Divider }
    if(e === 'Table'){ return Table }
    if(e === 'Form'){ return FormControl }
    if(e === 'Heading'){ return Heading }
    if(e === 'Text'){ return Text }
    if(e === 'Image'){ return RenderImage }
    if(e === 'internalLink'){ return InternalLink }
    if(e === "icon") { return CustomIcon }
    if(e === "Menu") { return Menu }
    if(e === "MenuButton") { return MenuButton }
    if(e === "MenuList") { return MenuList }
    if(e === "MenuItem") { return MenuItem }
    if(e === "MenuItemOption") { return MenuItemOption }
    if(e === "MenuGroup") { return MenuGroup }
    if(e === "MenuOptionGroup") { return MenuOptionGroup }
    if(e === "MenuDivider") { return MenuDivider }
    if(e === "Popover") { return Popover }
    if(e === "PopoverTrigger") { return PopoverTrigger }
    if(e === "PopoverContent") { return PopoverContent }
    if(e === "PopoverHeader") { return PopoverHeader }
    if(e === "PopoverBody") { return PopoverBody }
    if(e === "PopoverFooter") { return PopoverFooter }
    if(e === "PopoverArrow") { return PopoverArrow }
    if(e === "PopoverCloseButton") { return PopoverCloseButton }
    if(e === "Drawer") { return DrawerState }
    if(e === "DrawerBody") { return DrawerBody }
    if(e === "DrawerFooter") { return DrawerFooter }
    if(e === "DrawerHeader") { return DrawerHeader }
    if(e === "DrawerOverlay") { return DrawerOverlay }
    if(e === "DrawerContent") { return DrawerContent }
    if(e === "DrawerCloseButton") { return DrawerCloseButton }
    if(e === "button") { return Button }
    else { return null }
}

export const RenderBlock = (e) => {
    if(e){
        let block;
        if(e.type === 'standard'){block = useElement(e.element)}
        if(block){
            let props = {}
            props['data-block'] = JSON.stringify({id: e.id, title: e.title, parent: e.parent})
            props['data-blockNode'] = true
            if(e.style){
                const entries = Object.entries(e.style)
                entries.map((e) => {
                    props[e[0]] = e[1]
                })
            }
            if(e._id){ props['id'] = e._id }
            if(e._hover){ props['_hover'] = e._hover }
            if(e.as){ props['as'] = e.as }
            if(e.element === "Image"){
                if(!e?.imgProps?.src){
                    props['src'] = PlaceholderImg
                }         
                else if(e?.imgProps?.src){ 
                    const entries = Object.entries(e.imgProps)
                    entries.map((e) => {
                        props[e[0]] = e[1]
                    })
                }     
                return createElement(
                    block,
                    props,
                    null
                ) 
            }
            if(e.element === "icon"){
                if(e?.iconProps){ 
                    const entries = Object.entries(e.iconProps)
                    entries.map((e) => {
                        props[e[0]] = e[1]
                    })
                }   
            }
            if(e.element === "Popover"){
                if(e?.trigger){ 
                    props['trigger'] = e.trigger
                }   
            }
            if(e.element === "internalLink"){     
                if(e?.linkProps){ 
                    const entries = Object.entries(e.linkProps)
                    entries.map((e) => {
                        props[e[0]] = e[1]
                    })
                }     
                let children = []
                if(e?.text){ children.push(e.text) }
                if(e.blocks?.length) { e.blocks.map((e) => children.push(RenderBlock(e))) }
                return createElement(
                    block,
                    props,
                    children?.length > 0 ? children : null
                )
            }
            if(e.element === "PopoverTrigger"){
                let children = []
                if(e.blocks?.length) { e.blocks.map((e) => children.push(RenderBlock(e))) }
                if(children.length === 0) {
                    const Placeholder = createElement('div',null,null)
                    children.push(Placeholder)
                }
                return createElement(
                    block,
                    props,
                    children?.length > 0 ? children[0] : null
                )
            }
            else {
                let children = []
                if(e?.text){ children.push(e.text) }
                if(e.blocks?.length) { e.blocks.map((e) => children.push(RenderBlock(e))) }
                return createElement(
                    block,
                    props,
                    children?.length > 0 ? children : null
                )
            }
        }
        else { return null }
    }
    else { return null}
}