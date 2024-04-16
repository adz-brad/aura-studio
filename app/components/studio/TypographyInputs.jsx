import { useEffect } from "react"
import { updateValue, deleteValue } from "@/app/lib/fetch"
import { SimpleSelect, SimpleNumber, Number } from './Inputs'
import { useRecoilValue } from "recoil"
import { recoilThemeState } from "./atoms"

const TypographyInputs = ({ style, path, type, element, state, stateProps, breakpoint, parentPath }) => {

    const theme = useRecoilValue(recoilThemeState)

    useEffect(() => {
        if(style?.fontFamily){
            const hasFontFamilyKeys = Object.keys(style?.fontFamily).length !== 0
            if(!hasFontFamilyKeys){
                deleteValue(path,`style.fontFamily`,parentPath)
            }
        }
        if(style?.fontSize){
            const hasFontSizeKeys = Object.keys(style?.fontSize).length !== 0
            if(!hasFontSizeKeys){
                deleteValue(path,`style.fontSize`,parentPath)
            }
        }
        if(style?.fontWeight){
            const hasFontWeightKeys = Object.keys(style?.fontWeight).length !== 0
            if(!hasFontWeightKeys){
                deleteValue(path,`style.fontWeight`,parentPath)
            }
        }
        if(style?.color){
            const hasColorKeys = Object.keys(style?.color).length !== 0
            if(!hasColorKeys){
                deleteValue(path,`style.color`,parentPath)
            }
        }
        if(style?.lineHeight){
            const hasLineHeightKeys = Object.keys(style?.lineHeight).length !== 0
            if(!hasLineHeightKeys){
                deleteValue(path,`style.lineHeight`,parentPath)
            }
        }
        if(style?.letterSpacing){
            const hasLetterSpacingKeys = Object.keys(style?.letterSpacing).length !== 0
            if(!hasLetterSpacingKeys){
                deleteValue(path,`style.letterSpacing`,parentPath)
            }
        }
        if(style?.textAlign){
            const hasTextAlignKeys = Object.keys(style?.textAlign).length !== 0
            if(!hasTextAlignKeys){
                deleteValue(path,`style.textAlign`,parentPath)
            }
        }
        if(style?.fontStyle){
            const hasFontStyleKeys = Object.keys(style?.fontStyle).length !== 0
            if(!hasFontStyleKeys){
                deleteValue(path,`style.fontStyle`,parentPath)
            }
        }
        if(style?.textTransform){
            const hasTextTransformKeys = Object.keys(style?.textTransform).length !== 0
            if(!hasTextTransformKeys){
                deleteValue(path,`style.textTransform`,parentPath,parentPath)
            }
        }
        if(style?.textDecoration){
            const hasTextDecorationKeys = Object.keys(style?.textDecoration).length !== 0
            if(!hasTextDecorationKeys){
                deleteValue(path,`style.textDecoration`,parentPath)
            }
        }
        if(style?.textShadow){
            const hasTextShadowKeys = Object.keys(style?.textShadow).length !== 0
            if(!hasTextShadowKeys){
                deleteValue(path,`style.textShadow`,parentPath)
            }
        }
    }, [ style ])

    return (

        <div className="flex flex-col space-y-4">
            <SimpleSelect 
                label="Font Family"
                onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.fontFamily.${breakpoint}`,parentPath) : updateValue(path,{[`style.fontFamily.${breakpoint}`]: e.target.value },parentPath)}
                value={style?.fontFamily ? style.fontFamily[breakpoint] : null}
                placeholder="Select..."
                options={[
                    {name: 'Inherit', value: 'inherit'},
                    {name: 'Brand', value: 'brand'},
                    {name: 'Body', value: 'body'},
                    {name: 'Accent', value: 'accent'},
                ]}
            />
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Font Size"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.fontSize.${breakpoint}`,parentPath) : updateValue(path,{[`style.fontSize.${breakpoint}`]: `0${e.target.value}` },parentPath)}
                    value={style?.fontSize ? style.fontSize[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.fontSize ?
                    style?.fontSize[breakpoint] && style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.fontSize[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.fontSize ? parseFloat(style?.fontSize[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.fontSize.${breakpoint}`]: `${val}${style.fontSize[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Font Weight"
                    onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.fontWeight.${breakpoint}`,parentPath) : updateValue(path,{[`style.fontWeight.${breakpoint}`]: 400 },parentPath)}
                    value={style?.fontWeight ? style?.fontWeight[breakpoint] ? "value" : null : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'Value', value: 'value'},
                    ]}
                />
                {style?.fontWeight ?
                    style?.fontWeight[breakpoint] ?
                        <SimpleNumber 
                            label="Value"
                            min={100}
                            max={900}
                            step={100}
                            defaultVal={400}
                            value={style?.fontWeight ? style?.fontWeight[breakpoint] : null}
                            onChange={(val) => updateValue(path,{[`style.fontWeight.${breakpoint}`]: val},parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">      
                    <div className="w-8 h-8 rounded-full border-2 border-base-500/50" style={{backgroundColor: stateProps?.color ? theme?.colors?.filter(e => e.id === stateProps.color?.split('-')[4]?.split(')')[0])[0]?.value?.hex : style?.color ? style.color[breakpoint] !== 'transparent' ? theme?.colors?.filter(e => e.id === style.color[breakpoint]?.split('-')[4]?.split(')')[0])[0]?.value?.hex : 'transparent' : 'inherit'}} />
                    <div className="grow">
                        <SimpleSelect 
                            label="Color"
                            value={stateProps?.color ? stateProps.color?.split('-')[4]?.split(')')[0] : style?.color ? style.color[breakpoint] === 'transparent' ? 'transparent' : style.color[breakpoint]?.split('-')[4]?.split(')')[0] : null}
                            onChange={(e) => e.target.value === 'unset' ? deleteValue(path, state ? `${state}.color` : `style.color.${breakpoint}`,parentPath) : e.target.value === 'transparent' ? updateValue(path,{[ state ? `${state}.color` : `style.color.${breakpoint}`]: 'transparent'},parentPath) : updateValue(path,{[ state ? `${state}.color` : `style.color.${breakpoint}`]: `var(--chakra-colors-${e.target.value})`},parentPath)}
                            placeholder="Select..."
                            options={[
                                { name: 'Unset', value: 'unset'},
                                { name: 'Transparent', value: 'transparent'},
                                ...theme?.colors?.map((e) => {
                                return { name: e.name, value: e.id }
                                })
                            ]}
                        />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Line Height"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.lineHeight.${breakpoint}`,parentPath) : updateValue(path,{[`style.lineHeight.${breakpoint}`]: `0${e.target.value}` },parentPath)}
                    value={style?.lineHeight ? style.lineHeight[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.lineHeight ?
                    style?.lineHeight[breakpoint] && style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1080 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 67.5 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.lineHeight[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.lineHeight ? parseFloat(style?.lineHeight[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.lineHeight.${breakpoint}`]: `${val}${style.lineHeight[breakpoint].replace(/[0-9.]/g, '')}`},parentPath)}
                        />
                    : null
                : null }

                <SimpleSelect 
                    label="Letter Spacing"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.letterSpacing.${breakpoint}`,parentPath) : updateValue(path,{[`style.letterSpacing.${breakpoint}`]: `0${e.target.value}`},parentPath)}
                    value={style?.letterSpacing ? style.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '') : null}
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
                {style?.letterSpacing ?
                    style?.letterSpacing[breakpoint] && style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={
                                style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1920 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 120 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 100 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 100
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 100
                                : 0
                            }
                            step={
                                style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'px' ? 1 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'rem' ? 0.5 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === '%' ? 1 
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'vh' ? 1
                                : style?.letterSpacing[breakpoint]?.replace(/[0-9.]/g, '')  === 'vw' ? 1
                                : 1
                            }
                            defaultVal={0}
                            value={style?.letterSpacing ? parseFloat(style?.letterSpacing[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.letterSpacing.${breakpoint}`]: `${val}${style.letterSpacing[breakpoint].replace(/[0-9.]/g, '')}`},parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="grid grid-cols-2 gap-4">
                <SimpleSelect 
                    label="Text Align"
                    onChange={(e) => e.target.value === 'inherit' ? deleteValue(path,`style.textAlign.${breakpoint}`,parentPath) : updateValue(path,{[`style.textAlign.${breakpoint}`]: e.target.value },parentPath)}
                    value={style?.textAlign ? style.textAlign[breakpoint] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Inherit', value: 'inherit'},
                        {name: 'Start', value: 'start'},
                        {name: 'End', value: 'end'},
                        {name: 'Left', value: 'left'},
                        {name: 'Right', value: 'right'},
                        {name: 'Center', value: 'center'},
                        {name: 'Justify', value: 'justify'},
                        {name: 'Justify All', value: 'justify-all'},
                        {name: 'Match Parent', value: 'match-parent'},
                    ]}
                />
                <SimpleSelect 
                    label="Font Style"
                    onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.fontStyle.${breakpoint}`,parentPath) : updateValue(path,{[`style.fontStyle.${breakpoint}`]: e.target.value },parentPath)}
                    value={style?.fontStyle ? style.fontStyle[breakpoint] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'Italic', value: 'italic'},
                    ]}
                />
                <SimpleSelect 
                    label="Text Transform"
                    onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.textTransform.${breakpoint}`) : updateValue(path,{[`style.textTransform.${breakpoint}`]: e.target.value },parentPath)}
                    value={style?.textTransform ? style.textTransform[breakpoint] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'None', value: 'none'},
                        {name: 'Capitalize', value: 'capitalize'},
                        {name: 'Uppercase', value: 'uppercase'},
                        {name: 'Lowercase', value: 'lowercase'},
                    ]}
                />
                <SimpleSelect 
                    label="Text Decoration"
                    onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.textDecoration.${breakpoint}`,parentPath) : updateValue(path,{[`style.textDecoration.${breakpoint}`]: e.target.value },parentPath)}
                    value={style?.textDecoration ? style.textDecoration[breakpoint] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'None', value: 'none'},
                        {name: 'Underline', value: 'underline'},
                        {name: 'Overline', value: 'overline'},
                    ]}
                />
            </div>
            <div className="flex flex-row space-x-4 items-center">      
                    <div className="w-8 h-8 rounded-full border-2 border-base-500/50" style={{backgroundColor: style?.textShadow ? style.textShadow[breakpoint]?.split(' ')[3] !== 'transparent' ? theme?.colors?.filter(e => e.id === style.textShadow[breakpoint]?.split(' ')[3]?.split('-')[4]?.split(')')[0])[0]?.value?.hex : 'transparent' : 'inherit'}} />
                    <div className="grow">
                        <SimpleSelect 
                            label="Text Shadow"
                            value={style?.textShadow ? style?.textShadow[breakpoint]?.split(' ')[3] === 'transparent' ? 'transparent' : style.textShadow[breakpoint]?.split('-')[4]?.split(')')[0] : null}
                            onChange={(e) => 
                                e.target.value === 'unset' ? 
                                    deleteValue(path,`style.textShadow.${breakpoint}`,parentPath) 
                                    : e.target.value === 'transparent' ? 
                                        updateValue(path,{[`style.textShadow.${breakpoint}`]: style?.textShadow ?
                                            `${style?.textShadow[breakpoint]?.split(' ')[0]} ${style?.textShadow[breakpoint]?.split(' ')[1]} ${style?.textShadow[breakpoint]?.split(' ')[2]} transparent` 
                                            : `1px 1px 1px transparent`},parentPath) 
                                        : updateValue(path,{[`style.textShadow.${breakpoint}`]: style?.textShadow ?
                                            `${style?.textShadow[breakpoint]?.split(' ')[0]} ${style?.textShadow[breakpoint]?.split(' ')[1]} ${style?.textShadow[breakpoint]?.split(' ')[2]} var(--chakra-colors-${e.target.value})` 
                                            : `1px 1px 1px var(--chakra-colors-${e.target.value})`},parentPath)}
                            placeholder="Select..."
                            options={[
                                { name: 'Unset', value: 'unset'},
                                { name: 'Transparent', value: 'transparent'},
                                ...theme?.colors?.map((e) => {
                                return { name: e.name, value: e.id }
                                })
                            ]}
                        />
                </div>
            </div>
            {style?.textShadow ?
                    style?.textShadow[breakpoint] ?
                    <div className="flex flex-row space-x-4 items-center">  
                        <Number 
                            label="Offset X"
                            min={0}
                            max={1920}
                            step={1}
                            defaultVal={0}
                            value={style?.textShadow ? parseFloat(style?.textShadow[breakpoint]?.split(' ')[0]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.textShadow.${breakpoint}`]: `${val}px ${style?.textShadow[breakpoint]?.split(' ')[1]} ${style?.textShadow[breakpoint]?.split(' ')[2]} ${style?.textShadow[breakpoint]?.split(' ')[3]}` },parentPath)}
                        />
                        <Number 
                        label="Offset Y"
                        min={0}
                        max={1920}
                        step={1}
                        defaultVal={0}
                        value={style?.textShadow ? parseFloat(style?.textShadow[breakpoint]?.split(' ')[1]?.replace(/[^\d.-]/g, '')) : null}
                        onChange={(val) => updateValue(path,{[`style.textShadow.${breakpoint}`]: `${style?.textShadow[breakpoint]?.split(' ')[0]} ${val}px ${style?.textShadow[breakpoint]?.split(' ')[2]} ${style?.textShadow[breakpoint]?.split(' ')[3]}` },parentPath)}
                    />
                    <Number 
                    label="Blur Radius"
                    min={0}
                    max={1920}
                    step={1}
                    defaultVal={0}
                    value={style?.textShadow ? parseFloat(style?.textShadow[breakpoint]?.split(' ')[2]?.replace(/[^\d.-]/g, '')) : null}
                    onChange={(val) => updateValue(path,{[`style.textShadow.${breakpoint}`]: `${style?.textShadow[breakpoint]?.split(' ')[0]} ${style?.textShadow[breakpoint]?.split(' ')[1]} ${val}px ${style?.textShadow[breakpoint]?.split(' ')[3]}` },parentPath)}
                />
                </div>
                    : null
                : null }
            <div className="flex flex-row space-x-4 items-center"> 
            
            </div>
        </div>

    )
}
export default TypographyInputs  