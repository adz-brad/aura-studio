import { useEffect, useState } from "react"
import { updateValue, deleteValue } from "@/app/lib/fetch"
import { IoMdAddCircleOutline } from "react-icons/io";
import { SimpleSelect, Number } from './Inputs'
import { useRecoilValue } from "recoil"
import { recoilThemeState } from "./atoms"
import Media from "./Media";
import Popup from "../ui/Popup";
import Image from "next/image";

const BackgroundInputs = ({ style, path, type, element, state, stateProps, breakpoint, parentPath }) => {

    const theme = useRecoilValue(recoilThemeState)

    useEffect(() => {
        if(style?.bgColor){
            const hasBgColorKeys = Object.keys(style?.bgColor).length !== 0
            if(!hasBgColorKeys){
                deleteValue(path,`style.bgColor`,parentPath)
            }
        }
        if(style?.opacity){
            const hasOpacityKeys = Object.keys(style?.opacity).length !== 0
            if(!hasOpacityKeys){
                deleteValue(path,`style.opacity`,parentPath)
            }
        }
        if(style?.bgGradient){
            const hasBgGradientKeys = Object.keys(style?.bgGradient).length !== 0
            if(!hasBgGradientKeys){
                deleteValue(path,`style.bgGradient`,parentPath)
            }
        }
        if(style?.bgImage){
            const hasBgImageKeys = Object.keys(style?.bgImage).length !== 0
            if(!hasBgImageKeys){
                deleteValue(path,`style.bgImage`,parentPath)
            }
        }
        if(style?.bgPosition){
            const hasBgPositionKeys = Object.keys(style?.bgPosition).length !== 0
            if(!hasBgPositionKeys){
                deleteValue(path,`style.bgPosition`,parentPath)
            }
        }
        if(style?.bgRepeat){
            const hasBgRepeatKeys = Object.keys(style?.bgRepeat).length !== 0
            if(!hasBgRepeatKeys){
                deleteValue(path,`style.bgRepeat`,parentPath)
            }
        }
        if(style?.bgSize){
            const hasBgSizeKeys = Object.keys(style?.bgSize).length !== 0
            if(!hasBgSizeKeys){
                deleteValue(path,`style.bgSize`,parentPath)
            }
        }
        if(style?.bgClip){
            const hasBgClipKeys = Object.keys(style?.bgClip).length !== 0
            if(!hasBgClipKeys){
                deleteValue(path,`style.bgClip`,parentPath)
            }
        }
    }, [ style ])

    const [ imageSelect, setImageSelect ] = useState(false)

    const useImage = (e) => {
        if(style?.bgGradient){
            if(style?.bgGradient[breakpoint]){
                deleteValue(path,`style.bgGradient.${breakpoint}`,parentPath)
            }
        }
        updateValue(path,{[`style.bgImage.${breakpoint}`]: `url('${e.url}')`},parentPath)
        setImageSelect(false)
    }

    const useBgGradient = (e) => {
        if(style?.bgImage){
            if(style?.bgImage[breakpoint]){
                deleteValue(path,`style.bgImage.${breakpoint}`,parentPath)
            }
        }
        e === 'unset' ? deleteValue(path,`style.bgGradient.${breakpoint}`,parentPath) : updateValue(path,{[`style.bgGradient.${breakpoint}`]: 
            e ==="linear" ? 
                `linear(0deg,var(--chakra-colors-primary),var(--chakra-colors-secondary))` 
            : `radial(ellipse,var(--chakra-colors-primary),var(--chakra-colors-secondary))`
        },parentPath)
    }
    return (

        <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4 items-center">      
                <div className="w-8 h-8 rounded-full border-2 border-base-500/50" style={{backgroundColor: stateProps?.bgColor ? theme?.colors?.filter(e => e.id === stateProps.bgColor?.split('-')[4]?.split(')')[0])[0]?.value?.hex : style?.bgColor ? style.bgColor[breakpoint] !== 'transparent' ? theme?.colors?.filter(e => e.id === style.bgColor[breakpoint]?.split('-')[4]?.split(')')[0])[0]?.value?.hex : 'transparent' : 'inherit'}} />
                    <div className="grow">
                        <SimpleSelect 
                            label="Background Color"
                            value={stateProps ? stateProps.bgColor?.split('-')[4]?.split(')')[0] : style?.bgColor ? style.bgColor[breakpoint] === 'transparent' ? 'transparent' : style.bgColor[breakpoint]?.split('-')[4]?.split(')')[0] : null}
                            onChange={(e) => e.target.value === 'unset' ? deleteValue(path, state ? `${state}.bgColor` : `style.bgColor.${breakpoint}`,parentPath) : e.target.value === 'transparent' ? updateValue(path,{[state ? `${state}.bgColor` : `style.bgColor.${breakpoint}`]: 'transparent'},parentPath) : updateValue(path,{[state ? `${state}.bgColor` : `style.bgColor.${breakpoint}`]: `var(--chakra-colors-${e.target.value})`},parentPath)}
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
                    label="Opacity"
                    onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.opacity.${breakpoint}`,parentPath) : updateValue(path,{[`style.opacity.${breakpoint}`]: `100${e.target.value}` },parentPath)}
                    value={style?.opacity ? style.opacity[breakpoint]?.replace(/[0-9.]/g, '') : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'Value', value: '%'},
                    ]}
                />
                {style?.opacity ?
                    style?.opacity[breakpoint] && style?.opacity[breakpoint]?.replace(/[0-9.]/g, '') !== 'inherit' ?
                        <Number 
                            label="Value"
                            min={0}
                            max={100}
                            step={1}
                            defaultVal={0}
                            value={style?.opacity ? parseFloat(style?.opacity[breakpoint]?.replace(/[^\d.-]/g, '')) : null}
                            onChange={(val) => updateValue(path,{[`style.opacity.${breakpoint}`]: `${val}${style.opacity[breakpoint].replace(/[0-9.]/g, '')}` },parentPath)}
                        />
                    : null
                : null }
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <SimpleSelect 
                    label="Background Gradient"
                    onChange={(e) => useBgGradient(e.target.value)}
                    value={style?.bgGradient ? style.bgGradient[breakpoint]?.split('(')[0] : null}
                    placeholder="Select..."
                    options={[
                        {name: 'Unset', value: 'unset'},
                        {name: 'Linear', value: 'linear'},
                        {name: 'Radial', value: 'radial'},
                    ]}
                />
                {style?.bgGradient ?
                    style?.bgGradient[breakpoint] ?
                        style.bgGradient[breakpoint].split('(')[0] === 'linear' ?
                            <Number 
                                label="Angle"
                                min={0}
                                max={360}
                                step={1}
                                defaultVal={0}
                                value={style?.bgGradient ? parseFloat(style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',')[0]?.replace(/[^\d.-]/g, '')) : null}
                                onChange={(val) => updateValue(path,{[`style.bgGradient.${breakpoint}`]: `${style.bgGradient[breakpoint]?.split('(')[0]}(${val}deg,${style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length).join(',')})`},parentPath)}
                            />
                        : 
                            <SimpleSelect 
                                label="Shape"
                                onChange={(e) => e === "ellipse" ? updateValue(path,{[`style.bgGradient.${breakpoint}`]: `${style.bgGradient[breakpoint]?.split('(')[0]}(${e.target.value},${style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length).join(',')})`},parentPath)
                                : updateValue(path,{[`style.bgGradient.${breakpoint}`]: `${style.bgGradient[breakpoint]?.split('(')[0]}(${e.target.value},${style.bgGradient[breakpoint].substring(6,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length).join(',')})`},parentPath)
                                }
                                value={style?.bgGradient ? style?.bgGradient[breakpoint]?.split(',')[0]?.split('(')[1] : null}
                                placeholder="Select..."
                                options={[
                                    {name: 'Ellipse', value: 'ellipse'},
                                    {name: 'Circle', value: 'circle'},
                                ]}
                            />
                    : null
                : null}
                </div>
                {style?.bgGradient ?
                    style?.bgGradient[breakpoint] ?
                        
                            <>
                                {style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length).map((value,i) => {
                                    const color = value.substring(20,value.length-1)
                                    const update = (val) => {
                                        const colors = style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length)
                                        if(val === "unset"){
                                                colors.splice(i,1)
                                        }
                                        else {
                                                colors[i] = `var(--chakra-colors-${val})`
                                        }
                                        updateValue(path,{[`style.bgGradient.${breakpoint}`]: `${style.bgGradient[breakpoint]?.split('(')[0]}(${style.bgGradient[breakpoint]?.split('(')[1]?.split(',')[0]},${colors.join(',')})`},parentPath)
                                    }
                                    return (
                                        <div className="flex flex-row space-x-4 items-center">      
                                            <div className="w-8 h-8 rounded-full border-2 border-base-500/50" style={{backgroundColor: color ? theme?.colors?.filter(e => e.id === color)[0]?.value?.hex : 'transparent'}} />
                                                <div className="grow">
                                                    <SimpleSelect 
                                                        label={`Gradient Color ${i+1}`}
                                                        value={color ? color : null}
                                                        onChange={(e) => update(e.target.value)}
                                                        placeholder="Select..."
                                                        options={i > 1 ? [
                                                            { name: 'Unset', value: 'unset'},
                                                            { name: 'Transparent', value: 'transparent'},
                                                            ...theme?.colors?.map((e) => {
                                                            return { name: e.name, value: e.id }
                                                            })
                                                        ] : 
                                                        [   
                                                            { name: 'Transparent', value: 'transparent'},
                                                            ...theme?.colors?.map((e) => {
                                                            return { name: e.name, value: e.id }
                                                            })
                                                        ]}
                                                    />
                                            </div>
                                        </div>
                                    )
                                })}
                                <button 
                                    type="button" 
                                    className="flex flex-row items-center justify-center space-x-2 group"
                                    onClick={() => updateValue(path,{[`style.bgGradient.${breakpoint}`]: `${style.bgGradient[breakpoint]?.split('(')[0]}(${style.bgGradient[breakpoint]?.split('(')[1]?.split(',')[0]},${style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').slice(1,style.bgGradient[breakpoint].substring(7,style.bgGradient[breakpoint].length-1).split(',').length).join(',')},var(--chakra-colors-primary))`},parentPath)}
                                >
                                    <span className="text-sm group-hover:font-medium">
                                        Add Color
                                    </span>
                                    <IoMdAddCircleOutline className="text-xl text-green-600 group-hover:brightness-125" />
                                </button>
                            </>   
                    : null
                : null }
            <div className="flex flex-col space-y-4">
                <span className='text-sm font-semibold'>Background Image</span>
                {style?.bgImage ?
                    style?.bgImage[breakpoint] ?
                    <div className="relative flex flex-col space-y-2 items-center justify-center h-[120px] md:h-[150px] lg:h-[200px] w-full shadow-md rounded-md border border-base-500/50 overflow-hidden">
                        <Image 
                        src={style?.bgImage[breakpoint]?.split("'")[1]} 
                        alt="Background Image" 
                        quality={75}
                        sizes="(max-width: 1920px) 400px"
                        fill
                        className="object-contain group-hover:scale-110 transition-all duration-300"
                      />
                      </div>
                    : null
                : null}
                <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => setImageSelect(true)}>
                    Select A Background Image
                </button>
                {imageSelect ?
                <Popup title="Select A Background Image" close={() => setImageSelect(false)}>
                    <Media use="Images" set={useImage} />
                </Popup>
                : null }
            </div>
            <SimpleSelect 
                label="Background Size"
                onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.bgSize.${breakpoint}`,parentPath) : updateValue(path,{[`style.bgSize.${breakpoint}`]: e.target.value },parentPath)}
                value={style?.bgSize ? style.bgSize[breakpoint] : null}
                placeholder="Select..."
                options={[
                    {name: 'Unset', value: 'unset'},
                    {name: 'Cover', value: 'cover'},
                    {name: 'Contain', value: 'contain'},
                ]}
            />
            <SimpleSelect 
                label="Background Position"
                onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.bgPosition.${breakpoint}`,parentPath) : updateValue(path,{[`style.bgPosition.${breakpoint}`]: e.target.value },parentPath)}
                value={style?.bgPosition ? style.bgPosition[breakpoint] : null}
                placeholder="Select..."
                options={[
                    {name: 'Unset', value: 'unset'},
                    {name: 'Top', value: 'top'},
                    {name: 'Bottom', value: 'bottom'},
                    {name: 'Left', value: 'left'},
                    {name: 'Right', value: 'right'},
                    {name: 'Center', value: 'center'},
                ]}
            />
            <SimpleSelect 
                label="Background Repeat"
                onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.bgRepeat.${breakpoint}`,parentPath) : updateValue(path,{[`style.bgRepeat.${breakpoint}`]: e.target.value },parentPath)}
                value={style?.bgRepeat ? style.bgRepeat[breakpoint] : null}
                placeholder="Select..."
                options={[
                    {name: 'Unset', value: 'unset'},
                    {name: 'Repeat X', value: 'repeat-x'},
                    {name: 'Repeat Y', value: 'repeat-y'},
                    {name: 'Repeat', value: 'repeat'},
                    {name: 'Space', value: 'space'},
                    {name: 'Round', value: 'round'},
                    {name: 'No Repeat', value: 'no-repeat'},
                ]}
            />
            <SimpleSelect 
                label="Background Clip"
                onChange={(e) => e.target.value === 'unset' ? deleteValue(path,`style.bgClip.${breakpoint}`,parentPath) : updateValue(path,{[`style.bgClip.${breakpoint}`]: e.target.value },parentPath)}
                value={style?.bgClip ? style.bgClip[breakpoint] : null}
                placeholder="Select..."
                options={[
                    {name: 'Unset', value: 'unset'},
                    {name: 'Border Box', value: 'border-box'},
                    {name: 'Padding Box', value: 'padding-box'},
                    {name: 'Content Box', value: 'content=box'},
                    {name: 'Text', value: 'text'},
                ]}
            />
        </div>

    )
}
export default BackgroundInputs