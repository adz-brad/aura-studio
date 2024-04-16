import { useState, useEffect } from "react"
import { deleteValue } from "@/app/lib/fetch"
import { SimpleSelect, Code } from './Inputs'
import { IoPhonePortraitOutline, IoPhoneLandscapeOutline } from "react-icons/io5";
import { CgLaptop, CgScreen, CgScreenWide } from "react-icons/cg";
import { MdOutlineTabletMac } from "react-icons/md";
import LayoutInputs from './LayoutInputs'
import SpacingInputs from './SpacingInputs'
import BackgroundInputs from './BackgroundInputs'
import TypographyInputs from './TypographyInputs'

const StyleEditor = ({ state, stateProps, style, path, type, element, css, parentPath }) => {

    const [ breakpoint, setBreakpoint ] = useState('base') // base, sm(480px), md(768px), lg(992px), xl(1280px), 2xl(1536px)
    const [ styleType, setStyleType ] = useState('layout') // layout, spacing, colors, typography, css

    const breakpoints = [
        {name: 'Base (0px)', value: 'base', icon: IoPhonePortraitOutline },
        {name: 'Sm (480px)', value: 'sm', icon: IoPhoneLandscapeOutline },
        {name: 'Md (768px)', value: 'md', icon: MdOutlineTabletMac },
        {name: 'Lg (992px)', value: 'lg', icon: CgLaptop },
        {name: 'Xl (1280px)', value: 'xl', icon: CgScreen },
        {name: '2xl (1536px)', value: '2xl', icon: CgScreenWide },
    ]


 
    useEffect(() => {
        // Delete Unused Style Object
        if(style){
            const hasStyleKeys = Object.keys(style).length !== 0
            if(!hasStyleKeys){
                deleteValue(path,`style`)
            }
        }
    }, [ style ])

    return (

        <>

            <SimpleSelect 
              label="Style Type"
              onChange={(e) => setStyleType(e.target.value)}
              placeholder="Select A Style Type To Edit"
              options={[
                {name: "Display / Layout", value: 'layout'},
                {name: "Borders / Spacing", value: 'spacing'},
                {name: "Typography", value: 'typography'},
                {name: "Background / Filters", value: 'background'},
                {name: "CSS", value: 'css'}
            ]}
              value={styleType}
            />

            <div className="flex flex-col space-y-4">

                {state ? null :
                <div className="flex flex-col space-y-1 w-fit">
                    <span className='text-sm font-semibold'>Breakpoint</span>
                    <div className="grid grid-cols-6 gap-1">
                        {breakpoints.map((e) => {
                            return (
                                <button
                                    type="button"
                                    className={`flex flex-col items-center justify-center w-9 h-9 group p-2 hover:text-brand-500 ${breakpoint === e.value ? 'text-brand-500' : 'text-base-700/70 dark:text-base-300/70'}`}
                                    title={`Set Breakpoint To ${e.name}`}
                                    onClick={() => setBreakpoint(e.value)}
                                >
                                    <e.icon  className="text-xl"/>
                                </button>
                            )
                        })}
                    </div>
                </div>
                }

                { styleType === 'layout' ? <LayoutInputs style={style} path={path} type={type} element={element} state={state} stateProps={stateProps} breakpoint={breakpoint} parentPath={parentPath} />
                : styleType === 'spacing' ? <SpacingInputs style={style} path={path} type={type} element={element} state={state} stateProps={stateProps} breakpoint={breakpoint} parentPath={parentPath} />
                : styleType === 'background' ? <BackgroundInputs style={style} path={path} type={type} element={element} state={state} stateProps={stateProps} breakpoint={breakpoint} parentPath={parentPath} />
                : styleType === 'typography' ? <TypographyInputs style={style} path={path} type={type} element={element} state={state} stateProps={stateProps} breakpoint={breakpoint} parentPath={parentPath} />
                : styleType === 'css' ?
                    <Code 
                        placeholder="Enter Custom CSS Properties For This Block. (ex. {font-color: 'red'})"
                        onChange={console.log}
                        path={path}
                        value={css}
                        _key="customCss"
                        label="Custom CSS"
                    />
                : null }

            </div>

        </>
        
    )
}
export default StyleEditor