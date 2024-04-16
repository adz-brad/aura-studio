import { useEffect } from "react"
import { updateValue, deleteValue } from "@/app/lib/fetch"
import { SimpleSelect, Number, Checkbox } from './Inputs'
import { useRecoilValue } from "recoil"
import { recoilThemeState } from "./atoms"

const SpacingInputs = ({ style, path, type, element, state, breakpoint, parentPath }) => {

    const theme = useRecoilValue(recoilThemeState)

    useEffect(() => {
        if(style?.borderTop){
            // Delete Unused Border Top Radius Prop
            if(!style?.borderTop[breakpoint] && style?.borderTopRadius){
                if(style?.borderTopRadius[breakpoint]){
                    deleteValue(path,`style.borderTopRadius.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Border Top Object
            const hasBorderTopKeys = Object.keys(style?.borderTop).length !== 0
            if(!hasBorderTopKeys){
                deleteValue(path,`style.borderTop`,parentPath)
            }
        }
        // Delete Unused Border Top Radius Object
        if(style?.borderTopRadius){
            const hasBorderTopRadiusKeys = Object.keys(style?.borderTopRadius).length !== 0
            if(!hasBorderTopRadiusKeys){
                deleteValue(path,`style.borderTopRadius`,parentPath)
            } 
        }
        if(style?.borderRight){
            // Delete Unused Border Right Radius Prop
            if(!style?.borderRight[breakpoint] && style?.borderRightRadius){
                if(style?.borderRightRadius[breakpoint]){
                    deleteValue(path,`style.borderRightRadius.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Border Right Object
            const hasBorderRightKeys = Object.keys(style?.borderRight).length !== 0
            if(!hasBorderRightKeys){
                deleteValue(path,`style.borderRight`,parentPath)
            }
        }
        // Delete Unused Border Right Radius Object
        if(style?.borderRightRadius){
            const hasBorderRightRadiusKeys = Object.keys(style?.borderRightRadius).length !== 0
            if(!hasBorderRightRadiusKeys){
                deleteValue(path,`style.borderRightRadius`,parentPath)
            } 
        }
        if(style?.borderBottom){
            // Delete Unused Border Bottom Radius Prop
            if(!style?.borderBottom[breakpoint] && style?.borderBottomRadius){
                if(style?.borderBottomRadius[breakpoint]){
                    deleteValue(path,`style.borderBottomRadius.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Border Bottom Object
            const hasBorderTopKeys = Object.keys(style?.borderBottom).length !== 0
            if(!hasBorderTopKeys){
                deleteValue(path,`style.borderBottom`,parentPath)
            }
        }
        // Delete Unused Border Bottom Radius Object
        if(style?.borderBottomRadius){
            const hasBorderBottomRadiusKeys = Object.keys(style?.borderBottomRadius).length !== 0
            if(!hasBorderBottomRadiusKeys){
                deleteValue(path,`style.borderBottomRadius`,parentPath)
            } 
        }
        if(style?.borderLeft){
            // Delete Unused Border Left Radius Prop
            if(!style?.borderLeft[breakpoint] && style?.borderLeftRadius){
                if(style?.borderLeftRadius[breakpoint]){
                    deleteValue(path,`style.borderLeftRadius.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Border Left Object
            const hasBorderTopKeys = Object.keys(style?.borderLeft).length !== 0
            if(!hasBorderTopKeys){
                deleteValue(path,`style.borderLeft`,parentPath)
            }
        }
        // Delete Unused Border Left Radius Object
        if(style?.borderLeftRadius){
            const hasBorderLeftRadiusKeys = Object.keys(style?.borderLeftRadius).length !== 0
            if(!hasBorderLeftRadiusKeys){
                deleteValue(path,`style.borderLeftRadius`,parentPath)
            } 
        }
        if(style?.marginTop){
            // Delete Unused Margin Top Prop
            if(!style?.marginTop[breakpoint]){
                if(style?.marginTop[breakpoint]){
                    deleteValue(path,`style.marginTop.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Margin Top Object
            const hasMarginTopKeys = Object.keys(style?.marginTop).length !== 0
            if(!hasMarginTopKeys){
                deleteValue(path,`style.marginTop`,parentPath)
            }
        }
        if(style?.marginRight){
            // Delete Unused Margin Right Prop
            if(!style?.marginRight[breakpoint]){
                if(style?.marginRight[breakpoint]){
                    deleteValue(path,`style.marginRight.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Margin Right Object
            const hasMarginRightKeys = Object.keys(style?.marginRight).length !== 0
            if(!hasMarginRightKeys){
                deleteValue(path,`style.marginRight`,parentPath)
            }
        }
        if(style?.marginBottom){
            // Delete Unused Margin Bottom Prop
            if(!style?.marginBottom[breakpoint]){
                if(style?.marginBottom[breakpoint]){
                    deleteValue(path,`style.marginBottom.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Margin Bottom Object
            const hasMarginBottomKeys = Object.keys(style?.marginBottom).length !== 0
            if(!hasMarginBottomKeys){
                deleteValue(path,`style.marginBottom`,parentPath)
            }
        }
        if(style?.marginLeft){
            // Delete Unused Margin Left Prop
            if(!style?.marginLeft[breakpoint]){
                if(style?.marginLeft[breakpoint]){
                    deleteValue(path,`style.marginLeft.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Margin Left Object
            const hasMarginLeftKeys = Object.keys(style?.marginLeft).length !== 0
            if(!hasMarginLeftKeys){
                deleteValue(path,`style.marginLeft`,parentPath)
            }
        }
        if(style?.paddingTop){
            // Delete Unused Padding Top Prop
            if(!style?.paddingTop[breakpoint]){
                if(style?.paddingTop[breakpoint]){
                    deleteValue(path,`style.paddingTop.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Padding Top Object
            const hasPaddingTopKeys = Object.keys(style?.paddingTop).length !== 0
            if(!hasPaddingTopKeys){
                deleteValue(path,`style.paddingTop`,parentPath)
            }
        }
        if(style?.paddingRight){
            // Delete Unused Padding Right Prop
            if(!style?.paddingRight[breakpoint]){
                if(style?.paddingRight[breakpoint]){
                    deleteValue(path,`style.paddingRight.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Padding Right Object
            const hasPaddingRightKeys = Object.keys(style?.paddingRight).length !== 0
            if(!hasPaddingRightKeys){
                deleteValue(path,`style.paddingRight`,parentPath)
            }
        }
        if(style?.paddingBottom){
            // Delete Unused Padding Bottom Prop
            if(!style?.paddingBottom[breakpoint]){
                if(style?.paddingBottom[breakpoint]){
                    deleteValue(path,`style.paddingBottom.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Padding Bottom Object
            const hasPaddingBottomKeys = Object.keys(style?.paddingBottom).length !== 0
            if(!hasPaddingBottomKeys){
                deleteValue(path,`style.paddingBottom`,parentPath)
            }
        }
        if(style?.paddingLeft){
            // Delete Unused Padding Left Prop
            if(!style?.paddingLeft[breakpoint]){
                if(style?.paddingLeft[breakpoint]){
                    deleteValue(path,`style.paddingLeft.${breakpoint}`,parentPath)
                }
            }
            // Delete Empty Padding Left Object
            const hasPaddingLeftKeys = Object.keys(style?.paddingLeft).length !== 0
            if(!hasPaddingLeftKeys){
                deleteValue(path,`style.paddingLeft`,parentPath)
            }
        }
    }, [ style ])


    return (

        <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Margin Top"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.marginTop.${breakpoint}`,parentPath) : updateValue(path,{[`style.marginTop.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.marginTop ? style.marginTop[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.marginTop ?
                    style?.marginTop[breakpoint] && style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.marginTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.marginTop ? parseFloat(style?.marginTop[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.marginTop.${breakpoint}`]: `${val}${style.marginTop[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Margin Right"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.marginRight.${breakpoint}`,parentPath) : updateValue(path,{[`style.marginRight.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.marginRight ? style.marginRight[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.marginRight ?
                    style?.marginRight[breakpoint] && style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.marginRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.marginRight ? parseFloat(style?.marginRight[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.marginRight.${breakpoint}`]: `${val}${style.marginRight[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Margin Bottom"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.marginBottom.${breakpoint}`,parentPath) : updateValue(path,{[`style.marginBottom.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.marginBottom ? style.marginBottom[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.marginBottom ?
                    style?.marginBottom[breakpoint] && style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.marginBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.marginBottom ? parseFloat(style?.marginBottom[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.marginBottom.${breakpoint}`]: `${val}${style.marginBottom[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Margin Left"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.marginLeft.${breakpoint}`,parentPath) : updateValue(path,{[`style.marginLeft.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.marginLeft ? style.marginLeft[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.marginLeft ?
                    style?.marginLeft[breakpoint] && style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.marginLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.marginLeft ? parseFloat(style?.marginLeft[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.marginLeft.${breakpoint}`]: `${val}${style.marginLeft[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Padding Top"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.paddingTop.${breakpoint}`,parentPath) : updateValue(path,{[`style.paddingTop.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.paddingTop ? style.paddingTop[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.paddingTop ?
                    style?.paddingTop[breakpoint] && style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.paddingTop[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.paddingTop ? parseFloat(style?.paddingTop[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.paddingTop.${breakpoint}`]: `${val}${style.paddingTop[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Padding Right"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.paddingRight.${breakpoint}`,parentPath) : updateValue(path,{[`style.paddingRight.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.paddingRight ? style.paddingRight[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.paddingRight ?
                    style?.paddingRight[breakpoint] && style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1920 
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 120
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.paddingRight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.paddingRight ? parseFloat(style?.paddingRight[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.paddingRight.${breakpoint}`]: `${val}${style.paddingRight[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Padding Bottom"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.paddingBottom.${breakpoint}`,parentPath) : updateValue(path,{[`style.paddingBottom.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.paddingBottom ? style.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.paddingBottom ?
                    style?.paddingBottom[breakpoint] && style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.paddingBottom[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.paddingBottom ? parseFloat(style?.paddingBottom[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.paddingBottom.${breakpoint}`]: `${val}${style.paddingBottom[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Padding Left"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.paddingLeft.${breakpoint}`,parentPath) : updateValue(path,{[`style.paddingLeft.${breakpoint}`]: e.target.value === 'auto' ? e.target.value : `0${e.target.value}` },parentPath)}
                    value={style?.paddingLeft ? style.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.paddingLeft ?
                    style?.paddingLeft[breakpoint] && style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' && style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '') !== 'auto' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1920 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 120 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.paddingLeft[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.paddingLeft ? parseFloat(style?.paddingLeft[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.paddingLeft.${breakpoint}`]: `${val}${style.paddingLeft[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
                        
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 items-center">
                    <Checkbox 
                        label="Border Top" 
                        onChange={(e) => 
                            e.target.checked ? 
                            updateValue(path,{[`style.borderTop.${breakpoint}`]: '0px solid transparent'},parentPath)
                            : deleteValue(path,`style.borderTop.${breakpoint}`,parentPath)
                        }
                        value={style?.borderTop ? style.borderTop[breakpoint] : null}
                    />
                    {style?.borderTop ?
                        style.borderTop[breakpoint] ?     
                            <>
                                <Number 
                                    label="Weight"
                                    min={0}
                                    max={1080}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderTop ? parseInt(style?.borderTop[breakpoint]?.split(' ')[0]?.replace(/[^\d.-]/g, '')) : null}
                                    onChange={(val) => updateValue(path,{[`style.borderTop.${breakpoint}`]: `${val}px ${style?.borderTop[breakpoint]?.split(' ')[1]} ${style?.borderTop[breakpoint]?.split(' ')[2]}`},parentPath)}
                                />
                                <Number 
                                    label="Radius"
                                    min={0}
                                    max={9999}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderTopRadius ? parseInt(style?.borderTopRadius[breakpoint]?.replace(/[^\d.-]/g, '')) : 0}
                                    onChange={(val) => val > 0 ? updateValue(path,{[`style.borderTopRadius.${breakpoint}`]: `${val}px`},parentPath) : deleteValue(path, `style.borderTopRadius.${breakpoint}`,parentPath)}
                                />
                            </>
                        : null
                    : null }
                </div>
                {style?.borderTop ?
                    style.borderTop[breakpoint] ?     
                        <div className="flex flex-row space-x-4 items-center">
                            {style.borderTop[breakpoint].split(' ')[2] !== 'transparent' ?
                            <div className="w-8 h-8 rounded-full border-2 border-base-500/50" style={{backgroundColor: theme?.colors?.filter(e => e.id === style.borderTop[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0])[0]?.value?.hex}} />
                            : null }
                            <div className="grow">
                            <SimpleSelect 
                                label="Border Top Color"
                                value={style.borderTop ? style.borderTop[breakpoint].split(' ')[2] === 'transparent' ? 'Transparent' : style.borderTop[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0] : null}
                                onChange={(e) => e.target.value === 'transparent' ? updateValue(path,{[`style.borderTop.${breakpoint}`]: `${style?.borderTop[breakpoint]?.split(' ')[0]} ${style?.borderTop[breakpoint]?.split(' ')[1]} transparent`},parentPath) : updateValue(path,{[`style.borderTop.${breakpoint}`]: `${style?.borderTop[breakpoint]?.split(' ')[0]} ${style?.borderTop[breakpoint]?.split(' ')[1]} var(--chakra-colors-${e.target.value})`},parentPath)}
                                placeholder="Select..."
                                options={[
                                    { name: 'Transparent', value: 'transparent'},
                                    ...theme?.colors?.map((e) => {
                                    return { name: e.name, value: e.id }
                                    })
                                ]}
                            />
                            </div>
                        </div>
                    : null 
                : null }
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 items-center">
                    <Checkbox 
                        label="Border Right" 
                        onChange={(e) => 
                            e.target.checked ? 
                            updateValue(path,{[`style.borderRight.${breakpoint}`]: '0px solid transparent'},parentPath)
                            : deleteValue(path,`style.borderRight.${breakpoint}`,parentPath)
                        }
                        value={style?.borderRight ? style.borderRight[breakpoint] : null}
                    />
                    {style?.borderRight ?
                        style.borderRight[breakpoint] ?     
                            <>
                                <Number 
                                    label="Weight"
                                    min={0}
                                    max={1080}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderRight ? parseInt(style?.borderRight[breakpoint]?.split(' ')[0]?.replace(/[^\d.-]/g, '')) : null}
                                    onChange={(val) => updateValue(path,{[`style.borderRight.${breakpoint}`]: `${val}px ${style?.borderRight[breakpoint]?.split(' ')[1]} ${style?.borderRight[breakpoint]?.split(' ')[2]}`},parentPath)}
                                />
                                <Number 
                                    label="Radius"
                                    min={0}
                                    max={9999}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderRightRadius ? parseInt(style?.borderRightRadius[breakpoint]?.replace(/[^\d.-]/g, '')) : 0}
                                    onChange={(val) => val > 0 ? updateValue(path,{[`style.borderRightRadius.${breakpoint}`]: `${val}px`},parentPath) : deleteValue(path, `style.borderRightRadius.${breakpoint}`,parentPath)}
                                />
                            </>
                        : null
                    : null }
                </div>
                {style?.borderRight ?
                    style.borderRight[breakpoint] ?     
                        <div className="flex flex-row space-x-4 items-center">
                            {style.borderRight[breakpoint].split(' ')[2] !== 'transparent' ?
                            <div className="w-8 h-8 rounded-full" style={{backgroundColor: theme?.colors?.filter(e => e.id === style.borderRight[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0])[0]?.value?.hex}} />
                            : null }
                            <div className="grow">
                            <SimpleSelect 
                                label="Border Right Color"
                                value={style.borderRight ? style.borderRight[breakpoint].split(' ')[2] === 'transparent' ? 'Transparent' : style.borderRight[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0] : null}
                                onChange={(e) => e.target.value === 'transparent' ? updateValue(path,{[`style.borderRight.${breakpoint}`]: `${style?.borderRight[breakpoint]?.split(' ')[0]} ${style?.borderRight[breakpoint]?.split(' ')[1]} transparent`},parentPath) : updateValue(path,{[`style.borderRight.${breakpoint}`]: `${style?.borderRight[breakpoint]?.split(' ')[0]} ${style?.borderRight[breakpoint]?.split(' ')[1]} var(--chakra-colors-${e.target.value})`},parentPath)}
                                placeholder="Select..."
                                options={[
                                    { name: 'Transparent', value: 'transparent'},
                                    ...theme?.colors?.map((e) => {
                                    return { name: e.name, value: e.id }
                                    })
                                ]}
                            />
                            </div>
                        </div>
                    : null 
                : null }
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 items-center">
                    <Checkbox 
                        label="Border Bottom" 
                        onChange={(e) => 
                            e.target.checked ? 
                            updateValue(path,{[`style.borderBottom.${breakpoint}`]: '0px solid transparent'},parentPath)
                            : deleteValue(path,`style.borderBottom.${breakpoint}`,parentPath)
                        }
                        value={style?.borderBottom ? style.borderBottom[breakpoint] : null}
                    />
                    {style?.borderBottom ?
                        style.borderBottom[breakpoint] ?     
                            <>
                                <Number 
                                    label="Weight"
                                    min={0}
                                    max={1080}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderBottom ? parseInt(style?.borderBottom[breakpoint]?.split(' ')[0]?.replace(/[^\d.-]/g, '')) : null}
                                    onChange={(val) => updateValue(path,{[`style.borderBottom.${breakpoint}`]: `${val}px ${style?.borderBottom[breakpoint]?.split(' ')[1]} ${style?.borderBottom[breakpoint]?.split(' ')[2]}`},parentPath)}
                                />
                                <Number 
                                    label="Radius"
                                    min={0}
                                    max={9999}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderBottomRadius ? parseInt(style?.borderBottomRadius[breakpoint]?.replace(/[^\d.-]/g, '')) : 0}
                                    onChange={(val) => val > 0 ? updateValue(path,{[`style.borderBottomRadius.${breakpoint}`]: `${val}px`},parentPath) : deleteValue(path, `style.borderBottomRadius.${breakpoint}`,parentPath)}
                                />
                            </>
                        : null
                    : null }
                </div>
                {style?.borderBottom ?
                    style.borderBottom[breakpoint] ?     
                        <div className="flex flex-row space-x-4 items-center">
                            {style.borderBottom[breakpoint].split(' ')[2] !== 'transparent' ?
                            <div className="w-8 h-8 rounded-full" style={{backgroundColor: theme?.colors?.filter(e => e.id === style.borderBottom[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0])[0]?.value?.hex}} />
                            : null }
                            <div className="grow">
                            <SimpleSelect 
                                label="Border Bottom Color"
                                value={style.borderTop ? style.borderBottom[breakpoint].split(' ')[2] === 'transparent' ? 'Transparent' : style.borderBottom[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0] : null}
                                onChange={(e) => e.target.value === 'transparent' ? updateValue(path,{[`style.borderBottom.${breakpoint}`]: `${style?.borderBottom[breakpoint]?.split(' ')[0]} ${style?.borderBottom[breakpoint]?.split(' ')[1]} transparent`},parentPath) : updateValue(path,{[`style.borderBottom.${breakpoint}`]: `${style?.borderBottom[breakpoint]?.split(' ')[0]} ${style?.borderBottom[breakpoint]?.split(' ')[1]} var(--chakra-colors-${e.target.value})`},parentPath)}
                                placeholder="Select..."
                                options={[
                                    { name: 'Transparent', value: 'transparent'},
                                    ...theme?.colors?.map((e) => {
                                    return { name: e.name, value: e.id }
                                    })
                                ]}
                            />
                            </div>
                        </div>
                    : null 
                : null }
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 items-center">
                    <Checkbox 
                        label="Border Left" 
                        onChange={(e) => 
                            e.target.checked ? 
                            updateValue(path,{[`style.borderLeft.${breakpoint}`]: '0px solid transparent'},parentPath)
                            : deleteValue(path,`style.borderLeft.${breakpoint}`,parentPath)
                        }
                        value={style?.borderLeft ? style.borderLeft[breakpoint] : null}
                    />
                    {style?.borderLeft ?
                        style.borderLeft[breakpoint] ?     
                            <>
                                <Number 
                                    label="Weight"
                                    min={0}
                                    max={1080}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderLeft ? parseInt(style?.borderLeft[breakpoint]?.split(' ')[0]?.replace(/[^\d.-]/g, '')) : null}
                                    onChange={(val) => updateValue(path,{[`style.borderLeft.${breakpoint}`]: `${val}px ${style?.borderLeft[breakpoint]?.split(' ')[1]} ${style?.borderLeft[breakpoint]?.split(' ')[2]}`},parentPath)}
                                />
                                <Number 
                                    label="Radius"
                                    min={0}
                                    max={9999}
                                    step={1}
                                    defaultVal={0}
                                    value={style?.borderLeftRadius ? parseInt(style?.borderLeftRadius[breakpoint]?.replace(/[^\d.-]/g, '')) : 0}
                                    onChange={(val) => val > 0 ? updateValue(path,{[`style.borderLeftRadius.${breakpoint}`]: `${val}px`},parentPath) : deleteValue(path, `style.borderLeftRadius.${breakpoint}`,parentPath)}
                                />
                            </>
                        : null
                    : null }
                </div>
                {style?.borderLeft ?
                    style.borderLeft[breakpoint] ?     
                        <div className="flex flex-row space-x-4 items-center">
                            {style.borderLeft[breakpoint].split(' ')[2] !== 'transparent' ?
                            <div className="w-8 h-8 rounded-full" style={{backgroundColor: theme?.colors?.filter(e => e.id === style.borderLeft[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0])[0]?.value?.hex}} />
                            : null }
                            <div className="grow">
                            <SimpleSelect 
                                label="Border Left Color"
                                value={style.borderLeft ? style.borderLeft[breakpoint].split(' ')[2] === 'transparent' ? 'Transparent' : style.borderLeft[breakpoint].split(' ')[2]?.split('-')[4]?.split(')')[0] : null}
                                onChange={(e) => e.target.value === 'transparent' ? updateValue(path,{[`style.borderLeft.${breakpoint}`]: `${style?.borderLeft[breakpoint]?.split(' ')[0]} ${style?.borderLeft[breakpoint]?.split(' ')[1]} transparent`},parentPath) : updateValue(path,{[`style.borderLeft.${breakpoint}`]: `${style?.borderLeft[breakpoint]?.split(' ')[0]} ${style?.borderLeft[breakpoint]?.split(' ')[1]} var(--chakra-colors-${e.target.value})`},parentPath)}
                                placeholder="Select..."
                                options={[
                                    { name: 'Transparent', value: 'transparent'},
                                    ...theme?.colors?.map((e) => {
                                    return { name: e.name, value: e.id }
                                    })
                                ]}
                            />
                            </div>
                        </div>
                    : null 
                : null }
            </div>
            <SimpleSelect 
                    label="Box Shadow"
                    onChange={(e) => e.target.value === 'none' ? deleteValue(path,`style.boxShadow.${breakpoint}`,parentPath) : updateValue(path,{[`style.boxShadow.${breakpoint}`]: e.target.value },parentPath)}
                    value={style?.boxShadow ? style.boxShadow[breakpoint] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'None', value: 'none'},
                        {name: 'Xs', value: 'xs'},
                        {name: 'Sm', value: 'sm'},
                        {name: 'Base', value: 'base'},
                        {name: 'Md', value: 'md' },
                        {name: 'Lg', value: 'lg'},
                        {name: 'Xl', value: 'xl'},
                        {name: '2xl', value: '2xl'},
                        {name: 'Dark Lg', value: 'dark-lg'}
                    ]}
                />
        </div>

    )
}
export default SpacingInputs