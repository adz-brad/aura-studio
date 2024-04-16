import { useEffect } from "react"
import { updateValue, deleteValue } from "@/app/lib/fetch"
import { SimpleSelect, Radio, Number, SimpleNumber } from './Inputs'

const LayoutInputs = ({ style, path, type, element, state, stateProps, breakpoint, parentPath }) => {

    useEffect(() => {
        // Display
        if(style?.display){
            // Delete Unused Flex Props
            if(style?.display[breakpoint] !== 'flex'){
                // Delete Unused FlexDir Prop
                if(style?.flexDir){
                    if(style?.flexDir[breakpoint]){
                        deleteValue(path,`style.flexDir.${breakpoint}`,parentPath)
                    } 
                    const hasFlexDirKeys = Object.keys(style?.flexDir).length !== 0
                    if(!hasFlexDirKeys){
                        deleteValue(path,`style.flexDir`,parentPath)
                    }
                }
                // Delete Unused Gap Prop
                if(style?.gap){
                    if(style?.gap[breakpoint]){
                        deleteValue(path,`style.gap.${breakpoint}`,parentPath)
                    } 
                    const hasGapKeys = Object.keys(style?.gap).length !== 0
                    if(!hasGapKeys){
                        deleteValue(path,`style.gap`,parentPath)
                    }
                }
            }
            // Delete Unused Grid Props
            if(style?.display[breakpoint] !== 'grid'){
                // Delete Unused GridCols Prop
                if(style?.gridTemplateColumns){
                    if(style?.gridTemplateColumns[breakpoint]){
                        deleteValue(path,`style.gridTemplateColumns.${breakpoint}`,parentPath)
                    }
                    const hasGridColKeys = Object.keys(style?.gridTemplateColumns).length !== 0
                    if(!hasGridColKeys){
                        deleteValue(path,`style.gridTemplateColumns`,parentPath)
                    }
                }
                // Delete Unused GridGap Prop
                if(style?.gridGap){
                    if(style?.gridGap[breakpoint]){
                        deleteValue(path,`style.gridGap.${breakpoint}`,parentPath)
                    }
                    const hasGridGapKeys = Object.keys(style?.gridGap).length !== 0
                    if(!hasGridGapKeys){
                        deleteValue(path,`style.gridGap`,parentPath)
                    }
                }
            }
            // Delete Unused Display Prop
            const hasDisplayKeys = Object.keys(style?.display).length !== 0
            if(!hasDisplayKeys){
                deleteValue(path,`style.display`,parentPath)
            }
        }
        // Height
        if(style?.height){
            const hasHeightKeys = Object.keys(style?.height).length !== 0
            if(!hasHeightKeys){
                deleteValue(path,`style.height`,parentPath)
            }
        }
        // MinHeight
        if(style?.minHeight){
            const hasMinHeightKeys = Object.keys(style?.minHeight).length !== 0
            if(!hasMinHeightKeys){
                deleteValue(path,`style.minHeight`,parentPath)
            }
        }
        // MaxHeight
        if(style?.maxHeight){
            const hasMaxHeightKeys = Object.keys(style?.maxHeight).length !== 0
            if(!hasMaxHeightKeys){
                deleteValue(path,`style.maxHeight`,parentPath)
            }
        }
        // Width
        if(style?.width){
            const hasWidthKeys = Object.keys(style?.width).length !== 0
            if(!hasWidthKeys){
                deleteValue(path,`style.width`,parentPath)
            }
        }
        // MinWidth
        if(style?.minWidth){
            const hasMinWidthKeys = Object.keys(style?.minWidth).length !== 0
            if(!hasMinWidthKeys){
                deleteValue(path,`style.minWidth`,parentPath)
            }
        }
        // MaxWidth
        if(style?.maxWidth){
            const hasMaxWidthKeys = Object.keys(style?.maxWidth).length !== 0
            if(!hasMaxWidthKeys){
                deleteValue(path,`style.maxWidth`,parentPath)
            }
        }
        // Position
        if(style?.position){
            const hasPositionKeys = Object.keys(style?.position).length !== 0
            if(!hasPositionKeys){
                deleteValue(path,`style.position`,parentPath)
            }
        }
        if(!style?.position || style?.position === 'static'){
            if(style?.top){
                const hasTopKeys = Object.keys(style?.top).length !== 0
                if(!hasTopKeys){
                    deleteValue(path,`style.top`,parentPath)
                }
            }
            if(style?.right){
                const hasRightKeys = Object.keys(style?.right).length !== 0
                if(!hasRightKeys){
                    deleteValue(path,`style.right`,parentPath)
                }
            }
            if(style?.bottom){
                const hasBottomKeys = Object.keys(style?.bottom).length !== 0
                if(!hasBottomKeys){
                    deleteValue(path,`style.bottom`,parentPath)
                }
            }
            if(style?.left){
                const hasLeftKeys = Object.keys(style?.left).length !== 0
                if(!hasLeftKeys){
                    deleteValue(path,`style.left`,parentPath)
                }
            }
        }
        if(style?.zIndex){
            const hasZIndexKeys = Object.keys(style?.zIndex).length !== 0
            if(!hasZIndexKeys){
                deleteValue(path,`style.zIndex`,parentPath)
            }
        }
        if(style?.overflowX){
            const hasOverflowX = Object.keys(style?.overflowX).length !== 0
            if(!hasOverflowX){
                deleteValue(path,`style.overflowX`,parentPath)
            }
        }
        if(style?.overflowY){
            const hasOverflowYKeys = Object.keys(style?.overflowY).length !== 0
            if(!hasOverflowYKeys){
                deleteValue(path,`style.overflowY`,parentPath)
            }
        }
    }, [ style ])


    return (

                    <div className="flex flex-col space-y-4">
                        {element !== "Image" ?
                        <>
                        <SimpleSelect 
                            label="Display"
                            onChange={(e) => e.target.value === 'inherit' ? deleteValue(path, state ? `${state}.display` : `style.display.${breakpoint}`,parentPath) : updateValue(path,{[state ? `${state}.display`: `style.display.${breakpoint}`]: e.target.value },parentPath)}
                            value={state ? stateProps?.display : style?.display ? style.display[breakpoint] : null}
                            placeholder="Select..."
                            options={[
                                {name: 'Inherit', value: 'inherit'},
                                {name: 'Block', value: 'block'},
                                {name: 'Inline Block', value: 'inline-block'},
                                {name: 'Inline', value: 'inline'},
                                {name: 'Flex', value: 'flex'},
                                {name: 'Grid', value: 'grid'},
                                {name: 'None', value: 'none'},
                            ]}
                        />

                        { style?.display ?
                            style?.display[breakpoint] === 'flex' || style?.display[breakpoint] === 'grid' ?
                                <>
                                    { style.display[breakpoint] === 'flex' ?
                                        <div className="grid grid-cols-2 gap-4">
                                            <Radio 
                                                label="Flex Direction"
                                                value={style?.flexDir ? style.flexDir[breakpoint] : null}
                                                onChange={(e) => updateValue(path,{[`style.flexDir.${breakpoint}`]: e.target.value },parentPath)}
                                                options={[
                                                    {name: "Row", value: "row"},
                                                    {name: "Column", value: "column"}
                                                ]}
                                            />
                                            <Number 
                                                label="Gap"
                                                min={0}
                                                max={20}
                                                step={1}
                                                defaultVal={0}
                                                value={style?.gap ? style?.gap[breakpoint] : null}
                                                onChange={(val) => updateValue(path,{[`style.gap.${breakpoint}`]: val },parentPath)}
                                            />
                                            <SimpleSelect 
                                                label="Justify Content"
                                                onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.justifyContent.${breakpoint}`,parentPath) : updateValue(path,{[`style.justifyContent.${breakpoint}`]: e.target.value },parentPath)}
                                                value={style?.justifyContent ? style.justifyContent[breakpoint] : null}
                                                placeholder="Select..."
                                                options={[
                                                    {name: 'Inherit', value: 'inherit'},
                                                    {name: 'Normal', value: 'normal'},
                                                    {name: 'Stretch', value: 'stretch'},
                                                    {name: 'Left', value: 'left'},
                                                    {name: 'Right', value: 'right'},
                                                    {name: 'Center', value: 'center'},
                                                    {name: 'Start', value: 'start'},
                                                    {name: 'End', value: 'end'}, 
                                                    {name: 'Space Between', value: 'space-between'},
                                                    {name: 'Space Around', value: 'space-around'},
                                                    {name: 'Space Evenly', value: 'space-evenly'},
                                                ]}
                                            />
                                            <SimpleSelect 
                                                label="Align Items"
                                                onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.alignItems.${breakpoint}`) : updateValue(path,{[`style.alignItems.${breakpoint}`]: e.target.value },parentPath)}
                                                value={style?.alignItems ? style.alignItems[breakpoint] : null}
                                                placeholder="Select..."
                                                options={[
                                                    {name: 'Inherit', value: 'inherit'},
                                                    {name: 'Normal', value: 'normal'},
                                                    {name: 'Stretch', value: 'stretch'}, 
                                                    {name: 'Center', value: 'center'},
                                                    {name: 'Start', value: 'start'},
                                                    {name: 'End', value: 'end'},
                                                ]}
                                            />
                                        </div>
                                    :
                                        <div className="grid grid-cols-2 gap-4">
                                            <Number 
                                                label="Columns"
                                                min={1}
                                                max={8}
                                                step={1}
                                                defaultVal={1}
                                                value={style?.gridTemplateColumns ? parseInt(style?.gridTemplateColumns[breakpoint]?.charAt(7)) : null}
                                                onChange={(val) => updateValue(path,{[`style.gridTemplateColumns.${breakpoint}`]: `repeat(${val},1fr)`},parentPath)}
                                            />
                                            <Number 
                                                label="Gap"
                                                min={0}
                                                max={20}
                                                step={1}
                                                defaultVal={0}
                                                value={style?.gridGap ? style?.gridGap[breakpoint] : null}
                                                onChange={(val) => updateValue(path,{[`style.gridGap.${breakpoint}`]: val },parentPath)}
                                            />
                                        </div>
                                    }
                                </>
                            : null
                        : null}
                        </>
                        : null }
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row space-x-4 items-center">
                                <SimpleSelect 
                                        label="Height"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.height.${breakpoint}`,parentPath) : updateValue(path,{[`style.height.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                                        value={style?.height ? style.height[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Auto', value: 'auto'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.height ?
                                        style?.height[breakpoint] && style?.height[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.height[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                                    : style?.height[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.height ? parseFloat(style?.height[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.height.${breakpoint}`]: `${val}${style.height[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Min Height"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.minHeight.${breakpoint}`,parentPath) : updateValue(path,{[`style.minHeight.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.minHeight ? style.minHeight[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Fit', value: 'fit-content'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.minHeight ?
                                        style?.minHeight[breakpoint] && style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') !== 'fit-content' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1080 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 67.5 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.minHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.minHeight ? parseFloat(style?.minHeight[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.minHeight.${breakpoint}`]: `${val}${style.minHeight[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Max Height"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.maxHeight.${breakpoint}`,parentPath) : updateValue(path,{[`style.maxHeight.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.maxHeight ? style.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Fit', value: 'fit-content'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.maxHeight ?
                                        style?.maxHeight[breakpoint] && style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') !== 'fit-content' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1080 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 67.5 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.maxHeight[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.maxHeight ? parseFloat(style?.maxHeight[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.maxHeight.${breakpoint}`]: `${val}${style.maxHeight[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Width"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.width.${breakpoint}`,parentPath) : updateValue(path,{[`style.width.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                                        value={style?.width ? style.width[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Auto', value: 'auto'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.width ?
                                        style?.width[breakpoint] && style?.width[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.width[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1920 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 120 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.width[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.width ? parseFloat(style?.width[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.width.${breakpoint}`]: `${val}${style.width[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Min Width"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.minWidth.${breakpoint}`,parentPath) : updateValue(path,{[`style.minWidth.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.minWidth ? style.minWidth[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Fit', value: 'fit-content'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.minWidth ?
                                        style?.minWidth[breakpoint] && style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') !== 'fit-content' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1920 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 120 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.minWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.minWidth ? parseFloat(style?.minWidth[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.minWidth.${breakpoint}`]: `${val}${style.minWidth[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Max Width"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.maxWidth.${breakpoint}`,parentPath) : updateValue(path,{[`style.maxWidth.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.maxWidth ? style.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Fit', value: 'fit-content'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.maxWidth ?
                                        style?.maxWidth[breakpoint] && style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') !== 'fit-content' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1920 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 120 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.maxWidth[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.maxWidth ? parseFloat(style?.maxWidth[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.maxWidth.${breakpoint}`]: `${val}${style.maxWidth[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>

                        </div>

                        <SimpleSelect 
                            label="Position"
                            onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.position.${breakpoint}`,parentPath) : updateValue(path,{[`style.position.${breakpoint}`]: e.target.value },parentPath)}
                            value={style?.position ? style.position[breakpoint] : null}
                            placeholder="Select..."
                            options={[
                                {name: 'Inherit', value: 'inherit'}, 
                                {name: 'Static', value: 'static'}, // no trbl or z
                                {name: 'Relative', value: 'relative'},
                                {name: 'Absolute', value: 'absolute'},
                                {name: 'Fixed', value: 'fixed'},
                                {name: 'Sticky', value: 'sticky'},
                            ]}
                        />

                        { style?.position ?
                            style?.position[breakpoint] !== 'static' ?
                                <>
                                  <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Top"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.top.${breakpoint}`,parentPath) : updateValue(path,{[`style.top.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.top ? style.top[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.top ?
                                        style?.top[breakpoint] && style?.top[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1080 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 67.5 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.top[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.top ? parseFloat(style?.top[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.top.${breakpoint}`]: `${val}${style.top[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Right"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.right.${breakpoint}`,parentPath) : updateValue(path,{[`style.right.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.right ? style.right[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.right ?
                                        style?.right[breakpoint] && style?.right[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1920 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 120 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.right[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.right ? parseFloat(style?.right[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.right.${breakpoint}`]: `${val}${style.right[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Bottom"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.bottom.${breakpoint}`,parentPath) : updateValue(path,{[`style.bottom.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.bottom ? style.bottom[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.bottom ?
                                        style?.bottom[breakpoint] && style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1080 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 67.5 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.bottom[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.bottom ? parseFloat(style?.bottom[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.bottom.${breakpoint}`]: `${val}${style.bottom[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Left"
                                        onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.left.${breakpoint}`,parentPath) : updateValue(path,{[`style.left.${breakpoint}`]: e.target.value },parentPath)}
                                        value={style?.left ? style.left[breakpoint]?.replace(/[0-9.]/g, '') : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Inherit', value: 'inherit'},
                                            {name: 'Pixels', value: 'px'},
                                            {name: 'Rem', value: 'rem'},
                                            {name: 'Percent', value: '%'},
                                            {name: 'Viewport Height', value: 'vh'},
                                            {name: 'Viewport Width', value: 'vw'},
                                        ]}
                                    />
                                    {style?.left ?
                                        style?.left[breakpoint] && style?.left[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                                            <Number 
                                                label="Value"
                                                min={0}
                                                max={
                                                    style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1080 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 67.5 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 100 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 100
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 100
                                                    : 0
                                                }
                                                step={
                                                    style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'px' ? 1 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'rem' ? 0.5 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === '%' ? 1 
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'vh' ? 1
                                                    : style?.left[breakpoint]?.replace(/[0-9.]/g, '') === 'vw' ? 1
                                                    : 1
                                                }
                                                defaultVal={0}
                                                value={style?.left ? parseFloat(style?.left[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                                                onChange={(val) => updateValue(path,{[`style.left.${breakpoint}`]: `${val}${style.left[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                <div className="flex flex-row space-x-4 items-center">
                                    <SimpleSelect 
                                        label="Z-Index"
                                        onChange={(e) => e.target.value === 'auto' ? deleteValue(path,`style.zIndex.${breakpoint}`,parentPath) : updateValue(path,{[`style.zIndex.${breakpoint}`]: 0 },parentPath)}
                                        value={style?.zIndex ? style.zIndex[breakpoint] || style.zIndex[breakpoint] === 0 ? 'value' : 'auto' : null}
                                        placeholder="Select..."
                                        options={[
                                            {name: 'Auto', value: 'auto'},
                                            {name: 'Value', value: 'value'},
                                        ]}
                                    />
                                    {style.zIndex ?
                                        style.zIndex[breakpoint] || style.zIndex[breakpoint] === 0 ?
                                            <SimpleNumber 
                                                label="Z-Index"
                                                min={-999}
                                                max={999}
                                                step={1}
                                                defaultVal={0}
                                                value={style?.zIndex ? style?.zIndex[breakpoint] : null}
                                                onChange={(val) => updateValue(path,{[`style.zIndex.${breakpoint}`]: parseInt(val)},parentPath)}
                                            />
                                        : null
                                    : null }
                                </div>
                                </>
                            : null
                        : null}
                        {element !== "Image" ?
                            <div className="flex flex-row space-x-4 items-center">
                                <SimpleSelect 
                                    label="Overlow X"
                                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.overflowX.${breakpoint}`,parentPath) : updateValue(path,{[`style.overflowX.${breakpoint}`]: e.target.value },parentPath)}
                                    value={style?.overflowX ? style.overflowX[breakpoint] : null}
                                    placeholder="Select..."
                                    options={[
                                        {name: 'Inherit', value: 'inherit'},
                                        {name: 'Auto', value: 'auto'},
                                        {name: 'Visible', value: 'visible'},
                                        {name: 'Hidden', value: 'hidden'},
                                        {name: 'Clip', value: 'clip'},
                                        {name: 'Scroll', value: 'scroll'},
                                    ]}
                                />
                                <SimpleSelect 
                                    label="Overlow Y"
                                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.overflowY.${breakpoint}`,parentPath) : updateValue(path,{[`style.overflowY.${breakpoint}`]: e.target.value },parentPath)}
                                    value={style?.overflowY ? style.overflowY[breakpoint] : null}
                                    placeholder="Select..."
                                    options={[
                                        {name: 'Inherit', value: 'inherit'},
                                        {name: 'Auto', value: 'auto'},
                                        {name: 'Visible', value: 'visible'},
                                        {name: 'Hidden', value: 'hidden'},
                                        {name: 'Clip', value: 'clip'},
                                        {name: 'Scroll', value: 'scroll'},
                                    ]}
                                />
                            </div>
                        : null }
                    </div>

    )
}
export default LayoutInputs