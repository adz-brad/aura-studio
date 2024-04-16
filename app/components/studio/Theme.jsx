import { useRecoilValue } from 'recoil';
import { projectIdState, themeNavState } from './atoms';
import { Color, FileUpload, FontFromUrl, SimpleSelect } from './Inputs';
import { useState, useEffect } from "react"
import { query, onSnapshot, collection } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import { addFont, updateTheme } from '@/app/lib/fetch';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import "react-color-palette/css";
import { Alegreya,Antonio,Archivo,Arimo,Assistant,Bitter,Cabin,Cormorant,Crimson_Pro,DM_Sans,Dosis,Exo_2,Fira_Code,Inter,Libre_Franklin,Lora,Merriweather_Sans,Montserrat,Open_Sans,Oswald,Playfair_Display,Raleway,Rubik,Source_Sans_3,Roboto_Flex,Quicksand} from 'next/font/google'

const alegraya = Alegreya({ subsets: ['latin'] })
const antonio = Antonio({ subsets: ['latin'] })
const archivo = Archivo({ subsets: ['latin'] })
const arimo = Arimo({ subsets: ['latin'] })
const assistant = Assistant({ subsets: ['latin'] })
const bitter = Bitter({ subsets: ['latin'] })
const cabin = Cabin({ subsets: ['latin'] })
const coromorant = Cormorant({ subsets: ['latin'] })
const crimson_pro = Crimson_Pro({ subsets: ['latin'] })
const dm_sans = DM_Sans({ subsets: ['latin'] })
const dosis = Dosis({ subsets: ['latin'] })
const exo_2 = Exo_2({ subsets: ['latin'] })
const fira_code = Fira_Code({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const libre_franklin = Libre_Franklin({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })
const merriweather_sans = Merriweather_Sans({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })
const oswald = Oswald({ subsets: ['latin'] })
const playfair_display = Playfair_Display({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })
const roboto_flex = Roboto_Flex({ subsets: ['latin'] })
const rubik = Rubik({ subsets: ['latin'] })
const source_sans_3 = Source_Sans_3({ subsets: ['latin'] })
const quicksand = Quicksand({ subsets: ['latin'] })

const googleFonts = [
  { id: 'alegraya', name: 'Alegreya' },
  { id: 'antonio', name: 'Antonio' },
  { id: 'archivo', name: 'Archivo' },
  { id: 'arimo', name: 'Arimo' },
  { id: 'assistant', name: 'Assistant' },
  { id: 'bitter', name: 'Bitter' },
  { id: 'cabin', name: 'Cabin' },
  { id: 'coromorant', name: 'Cormorant' },
  { id: 'crimson_pro', name: 'Crimson Pro' },
  { id: 'dm_sans', name: 'DM Sans' },
  { id: 'dosis', name: 'Dosis' },
  { id: 'exo_2', name: 'Exo 2' },
  { id: 'fira_code', name: 'Fira Code' },
  { id: 'inter', name: 'Inter' },
  { id: 'libre_franklin', name: 'Libre Franklin' },
  { id: 'lora', name: 'Lora' },
  { id: 'merriweather_sans', name: 'Merriweather Sans' },
  { id: 'montserrat', name: 'Montserrat' },
  { id: 'open_sans', name: 'Open Sans' },
  { id: 'oswald', name: 'Oswald' },
  { id: 'playfair_display', name: 'Playfair Display' },
  { id: 'quicksand', name: 'Quicksand' },
  { id: 'raleway', name: 'Raleway' },
  { id: 'roboto_flex', name: 'Roboto Flex' },
  { id: 'rubik', name: 'Rubik' },
  { id: 'source_sans_3', name: 'Source Sans 3' },

]

const Theme = () => {

  const option = useRecoilValue(themeNavState)
  const projectId = useRecoilValue(projectIdState)

  const [ querySnap, setQuerySnap ] = useState(null)
  const [ theme, setTheme ] = useState(null)

  useEffect(() => {
    if(projectId && !querySnap){
        const col = query(collection(db, "projects", projectId, "stages", "draft", "theme"))
        const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
        return () => unsub()
    }
  }, [ projectId ])

  useEffect(() => {
    if(querySnap){
        setTheme(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
    }
  }, [ querySnap ])

  
  const colorOptions = [
    {name: 'Primary', value: 'primary'},
    {name: 'Secondary', value: 'secondary'},
    {name: 'Accent (light)', value: 'accentLight'},
    {name: 'Accent (dark)', value: 'accentDark'},
    {name: 'Base (light)', value: 'baseLight'},
    {name: 'Base (dark)', value: 'baseDark'},
  ]
  const [ colorSelect, setColorSelect] = useState(null)
  const [ colors, setColors ] = useState(null)
  const [ color, setColor ] = useState(null)

  const [ fonts, setFonts ] = useState(null)
  const [ localFonts, setLocalFonts ] = useState([])
  const [ fontType, setFontType ] = useState('google')
  const [ fontSelection, setFontSelection ] = useState('brand')
  const [ fromFile, setFromFile ] = useState(true)
  const [ sampleText, setSampleText ] = useState({
    brand: 'Sample Brand Text',
    body: 'Sample Body Text',
    accent: 'Sample Accent Text'
  })

  const [ defaults, setDefaults ] = useState(null)

  useEffect(() => {
    if(theme){
      // Set Colors
      const colorData = theme?.filter(e => e.id === 'colors')[0]
      if(colorData){
        const colorArr = Object.entries(colorData).map((e) => { 
            let order = e[1].order
            delete e[1].order
            return { id:e[0], name: colorOptions.filter(o => o.value === e[0])[0]?.name, value:e[1], order: order }
          
        }).sort(function(a, b) { return a.order - b.order }).slice(1)
        setColors(colorArr)
        if(!color && !colorSelect){
          setColorSelect({id: colorArr[0].id, order: colorArr[0].order})
          setColor(colorArr[0].value.hex)
        }
      }
      else{
        setColorSelect({id: "primary", order: 0 })
      }
      // Set Fonts
      const fontData = theme?.filter(e => e.id === 'fonts')[0]
      if(fontData){
        const { accent, body, brand } = fontData
        setFonts({accent,body,brand})
        if(fontData.local){
          setLocalFonts(fontData.local)
        }
      }
      // Set Defaults
      const defaultsData = theme?.filter(e => e.id === 'defaults')[0]
      if(defaultsData){
        const { id, ...rest } = defaultsData
        setDefaults(rest)
      }
    }
  }, [ theme ])

  useEffect(() => {
    if(color){
        const filter = colors?.filter(e => e.id === colorSelect.id)[0]
        setColor(filter.value.hex)
    }
  }, [ colorSelect ])

  const updateColor = (val) => {
    updateTheme(projectId,"colors",{[colorSelect.id]: {...val, order:colorSelect.order}})
  }

  return (
    <>
      {localFonts?.length ?
        localFonts.map((font) => {
          return (
              <style>
                {font.css.normalize()}
                {`.${font.id} {
                  font-family: "${font.name}"
                }`}
              </style>
          )
        })
      : null}
      <style>
      {`
        ul#fonts, button#fonts {
          .alegraya {
            font-family: ${alegraya.style.fontFamily}
          }
          .antonio {
            font-family: ${antonio.style.fontFamily}
          }
          .archivo {
            font-family: ${archivo.style.fontFamily}
          }
          .arimo {
            font-family: ${arimo.style.fontFamily}
          }
          .assistant {
            font-family: ${assistant.style.fontFamily}
          }
          .bitter {
            font-family: ${bitter.style.fontFamily}
          }
          .cabin {
            font-family: ${cabin.style.fontFamily}
          }
          .coromorant {
            font-family: ${coromorant.style.fontFamily}
          }
          .crimson_pro {
            font-family: ${crimson_pro.style.fontFamily}
          }
          .dm_sans {
            font-family: ${dm_sans.style.fontFamily}
          }
          .dosis {
            font-family: ${dosis.style.fontFamily}
          }
          .exo_2 {
            font-family: ${exo_2.style.fontFamily}
          }
          .fira_code {
            font-family: ${fira_code.style.fontFamily}
          }
          .inter {
            font-family: ${inter.style.fontFamily}
          }
          .libre_franklin {
            font-family: ${libre_franklin.style.fontFamily}
          }
          .lora {
            font-family: ${lora.style.fontFamily}
          }
          .merriweather_sans {
            font-family: ${merriweather_sans.style.fontFamily}
          }
          .montserrat {
            font-family: ${montserrat.style.fontFamily}
          }
          .open_sans {
            font-family: ${open_sans.style.fontFamily}
          }
          .oswald {
            font-family: ${oswald.style.fontFamily}
          }
          .playfair_display {
            font-family: ${playfair_display.style.fontFamily}
          }
          .quicksand {
            font-family: ${quicksand.style.fontFamily}
          }
          .raleway {
            font-family: ${raleway.style.fontFamily}
          }
          .roboto_flex {
            font-family: ${roboto_flex.style.fontFamily}
          }
          .rubik {
            font-family: ${rubik.style.fontFamily}
          }
          .source_sans_3 {
            font-family: ${source_sans_3.style.fontFamily}
          }
        }
      `}
      </style>
      <div className='flex flex-row space-x-8 pt-3 px-8 h-full'>
        {option === "Colors" ?
          <>
            <div className='flex flex-col space-y-4 w-1/2'>
              <span className="text-lg font-medium">Create Your Palette</span>
              <ul className='grid grid-cols-2 gap-4 grow'>
              {colors?.map((option) => {
                    return (
                      <li key={option.id} style={{backgroundColor: option.value.hex}} className={`rounded-lg group ${colorSelect.id === option.id ? 'ring' : 'ring-none'}`}>
                        <button 
                          type="button" 
                          onClick={() => setColorSelect({id:option.id, order:option.order})}
                          className='grid grid-cols-2 h-full w-full'
                        >
                          <div className="h-full p-2">
                            <div className={`flex flex-row items-center space-x-2 p-2 rounded-full bg-base-200/70 dark:bg-base-700/70 text-xs group-hover:brightness-125 ${colorSelect.id === option.id ? 'brightness-125' : 'brightness-100'}`}>
                              <div className="w-4 h-4 rounded-full shadow-lg border border-base-100 dark:border-base-900" style={{backgroundColor: option.value.hex}}/>
                              <span className='font-semibold'>
                                {option.name}
                              </span>
                            </div>
                          </div>
                          <div className="h-full grid grid-cols-1">
                            <div className="rounded-tr-lg" style={{backgroundColor: option.value.hex, filter: 'brightness(1.25)'}}/>
                            <div className="rounded-br-lg" style={{backgroundColor: option.value.hex, filter: 'brightness(0.75)'}}/>
                          </div>
                        </button>
                      </li>
                    )
                  })
              }
              </ul>
              {color ?
                  <Color current={color} onChange={updateColor} />
              : null}
            </div>
            <div className="flex flex-col space-y-4 w-1/2">
                <span className="text-lg font-medium">Choose Your Default Colors</span>
                <div className="flex flex-col space-y-6 h-full">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-row space-x-4 items-center">
                        <div className="w-12 h-12 rounded-full shadow-lg outline outline-base-500/50" style={{backgroundColor: defaults?.headings ? colors.filter(e => e.id === defaults?.headings)[0]?.value?.hex : '#000000' }}/>
                        <SimpleSelect 
                          label="Headings"
                          onChange={(e) => updateTheme(projectId,"defaults",{['headings']: e.target.value })}
                          value={defaults?.headings ? defaults.headings : null}
                          placeholder="Select..."
                          options={[
                            {name: "Primary", value: "primary"},
                            {name: "Secondary", value: "secondary"},
                            {name: "Base (light)", value: "baseLight"},
                            {name: "Base (dark)", value: "baseDark"},
                            {name: "Accent (light)", value: "accentLight"},
                            {name: "Accent (dark)", value: "accentDark"},
                          ]}
                        />   
                      </div>     
                      <div className="flex flex-row space-x-4 items-center">
                        <div className="w-12 h-12 rounded-full shadow-lg outline outline-base-500/50" style={{backgroundColor: defaults?.bodyText ? colors.filter(e => e.id === defaults?.bodyText)[0]?.value?.hex : '#000000' }}/>
                        <SimpleSelect 
                          label="Body Text"
                          onChange={(e) => updateTheme(projectId,"defaults",{['bodyText']: e.target.value })}
                          value={defaults?.bodyText ? defaults.bodyText : null}
                          placeholder="Select..."
                          options={[
                            {name: "Primary", value: "primary"},
                            {name: "Secondary", value: "secondary"},
                            {name: "Base (light)", value: "baseLight"},
                            {name: "Base (dark)", value: "baseDark"},
                            {name: "Accent (light)", value: "accentLight"},
                            {name: "Accent (dark)", value: "accentDark"},
                          ]}
                        />   
                      </div>     
                      <div className="flex flex-row space-x-4 items-center">
                        <div className="w-12 h-12 rounded-full shadow-lg outline outline-base-500/50" style={{backgroundColor: defaults?.backgroundColor ? colors.filter(e => e.id === defaults?.backgroundColor)[0]?.value?.hex : '#FFFFFF' }}/>
                        <SimpleSelect 
                          label="Background Color"
                          onChange={(e) => updateTheme(projectId,"defaults",{['backgroundColor']: e.target.value })}
                          value={defaults?.backgroundColor ? defaults.backgroundColor : null}
                          placeholder="Select..."
                          options={[
                            {name: "Primary", value: "primary"},
                            {name: "Secondary", value: "secondary"},
                            {name: "Base (light)", value: "baseLight"},
                            {name: "Base (dark)", value: "baseDark"},
                            {name: "Accent (light)", value: "accentLight"},
                            {name: "Accent (dark)", value: "accentDark"},
                          ]}
                        />   
                      </div>       
                      <div className="flex flex-row space-x-4 items-center">
                        <div className="w-12 h-12 rounded-full shadow-lg outline outline-base-500/50" style={{backgroundColor: defaults?.buttonText ? colors.filter(e => e.id === defaults?.buttonText)[0]?.value?.hex : '#FFFFFF' }}/>
                        <SimpleSelect 
                          label="Button Text"
                          onChange={(e) => updateTheme(projectId,"defaults",{['buttonText']: e.target.value })}
                          value={defaults?.buttonText ? defaults.buttonText : null}
                          placeholder="Select..."
                          options={[
                            {name: "Primary", value: "primary"},
                            {name: "Secondary", value: "secondary"},
                            {name: "Base (light)", value: "baseLight"},
                            {name: "Base (dark)", value: "baseDark"},
                            {name: "Accent (light)", value: "accentLight"},
                            {name: "Accent (dark)", value: "accentDark"},
                          ]}
                        />   
                      </div>                    
                      <div className="flex flex-row space-x-4 items-center">
                        <div className="w-12 h-12 rounded-full shadow-lg outline outline-base-500/50" style={{backgroundColor: defaults?.buttonBackground ? colors.filter(e => e.id === defaults?.buttonBackground)[0]?.value?.hex : '#000000' }}/>
                        <SimpleSelect 
                          label="Button Background Color"
                          onChange={(e) => updateTheme(projectId,"defaults",{['buttonBackground']: e.target.value })}
                          value={defaults?.buttonBackground ? defaults.buttonBackground : null}
                          placeholder="Select..."
                          options={[
                            {name: "Primary", value: "primary"},
                            {name: "Secondary", value: "secondary"},
                            {name: "Base (light)", value: "baseLight"},
                            {name: "Base (dark)", value: "baseDark"},
                            {name: "Accent (light)", value: "accentLight"},
                            {name: "Accent (dark)", value: "accentDark"},
                          ]}
                        />   
                    </div>  
                  </div>
                  <div className='flex flex-col grow rounded-lg shadow-lg p-8' style={{backgroundColor: defaults?.backgroundColor ? colors.filter(e => e.id === defaults?.backgroundColor)[0]?.value?.hex : '#FFFFFF' }}>
                    <h1 className={`text-5xl font-bold ${fonts?.brand?.id}`} style={{color: defaults?.headings ? colors.filter(e => e.id === defaults?.headings)[0]?.value?.hex : '#000000' }}>Should Prob Render An Iframe of the Site Here</h1>
                    <p className={`text-lg my-auto ${fonts?.body?.id}`} style={{color: defaults?.bodyText ? colors.filter(e => e.id === defaults?.bodyText)[0]?.value?.hex : '#000000' }}>
                      Lorme ipsum text font thing...
                    </p>
                  </div>
                </div>
            </div>
          </>
        : 
          null 
        }
        {option === "Fonts" ?
          <div className='grow grid grid-cols-3 divide-x divide-base-500/50 h-full'>

            <div className='flex flex-col pr-4'>
              <span className="text-lg pb-2 border-b border-brand-500">Choose A Font To Edit</span>
              <div className="grow grid grid-cols-1 gap-4 pt-4">
                <button
                  id="fonts"
                  className={`cursor-pointer flex flex-col  p-3 rounded-md hover:shadow-md hover:bg-base-700/70 ${fontSelection === 'brand' ? 'font-medium bg-base-700/70 ring' : 'bg-base-900 ring-none'}`} 
                  type="button" 
                  onClick={() => setFontSelection('brand')}
                >
                  <div className={`flex flex-row items-center space-x-2 w-full p-2 rounded-lg 300/70 dark:bg-base-700/70 text-xs group-hover:brightness-125 ${fontSelection === 'brand' ? 'brightness-125' : 'brightness-100'}`}>
                    <span className='text-lg'>Brand</span>
                    <input 
                      type="text" 
                      placeholder="Enter Some Sample Brand Text"
                      value={sampleText.brand}
                      onChange={(e) => setSampleText({...sampleText, brand: e.target.value})}
                      maxLength={20}
                      className='grow'
                    />
                  </div>
                  <div className={`w-full overflow-y-auto space-y-2 my-auto pointer-events-none ${fonts?.brand?.id}`}>
                  <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-4xl font-bold border-none" 
                    >
                      {sampleText.brand}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-2xl font-medium border-none" 
                    >
                      {sampleText.brand}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-lg border-none" 
                    >
                      {sampleText.brand}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full text-sm font-light overflow-hidden" 
                    >
                      {sampleText.brand}
                    </p>
                  </div>
                </button>
                <button
                  className={`cursor-pointer flex flex-col p-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fontSelection === 'body' ? 'font-medium bg-base-200/70 dark:bg-base-700/70 ring' : 'bg-base-50 dark:bg-base-900 ring-none'}`} 
                  type="button" 
                  onClick={() => setFontSelection('body')}
                  id="fonts"
                >
                  <div className={`flex flex-row items-center space-x-2 w-full p-2 rounded-lg bg-base-200/70 dark:bg-base-700/70 text-xs group-hover:brightness-125 ${fontSelection === 'body' ? 'brightness-125' : 'brightness-100'}`}>
                    <span className='text-lg'>Body</span>
                    <input 
                      type="text" 
                      placeholder="Enter Some Sample Body Text"
                      value={sampleText.body}
                      onChange={(e) => setSampleText({...sampleText, body: e.target.value})}
                      maxLength={20}
                      className='grow'
                    />
                  </div>
                  <div className={`w-full overflow-y-auto space-y-2 my-auto pointer-events-none ${fonts?.body?.id}`}>
                  <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-4xl font-bold border-none" 
                    >
                      {sampleText.body}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-2xl font-medium border-none" 
                    >
                      {sampleText.body}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-lg border-none" 
                    >
                      {sampleText.body}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full text-sm font-light overflow-hidden" 
                    >
                      {sampleText.body}
                    </p>
                  </div>
                </button>
                <button
                id="fonts"
                  className={`cursor-pointer flex flex-col p-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fontSelection === 'accent' ? 'font-medium bg-base-200/70 dark:bg-base-700/70 ring' : 'bg-base-50 dark:bg-base-900 ring-none'}`} 
                  type="button" 
                  onClick={() => setFontSelection('accent')}
                >
                  <div className={`flex flex-row items-center space-x-2 w-full p-2 rounded-lg bg-base-200/70 dark:bg-base-700/70 text-xs group-hover:brightness-125 ${fontSelection === 'accent' ? 'brightness-125' : 'brightness-100'}`}>
                    <span className='text-lg'>Accent</span>
                    <input 
                      type="text" 
                      placeholder="Enter Some Sample Accent Text"
                      value={sampleText.accent}
                      onChange={(e) => setSampleText({...sampleText, accent: e.target.value})}
                      maxLength={20}
                      className='grow'
                    />
                  </div>
                  <div className={`w-full overflow-y-auto space-y-2 my-auto pointer-events-none ${fonts?.accent?.id}`}>
                  <p 
                      contentEditable
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-4xl font-bold border-none" 
                    >
                      {sampleText.accent}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-2xl font-medium border-none" 
                    >
                      {sampleText.accent}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full overflow-hidden text-lg border-none" 
                    >
                      {sampleText.accent}
                    </p>
                    <p 
                      contentEditable  
                      className="caret-transparent cursor-pointer resize-none w-full text-sm font-light overflow-hidden" 
                    >
                      {sampleText.accent}
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-8 col-span-2 px-4">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className={`cursor-pointer justify-center flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fontType === 'google' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`} 
                  type="button" 
                  onClick={() => setFontType('google')}
                >
                  aura Fonts
                </button>
                <button 
                  className={`cursor-pointer justify-center flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fontType === 'local' ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`} 
                  type="button" 
                  onClick={() => setFontType('local')}
                >
                  Custom Fonts
                </button>
              </div>
              <div className="flex flex-col grow">
                {fontType === 'google' ?
                  <ul id="fonts" className="grid grid-cols-3 gap-4">
                    {googleFonts?.map((font) => {
                      return (
                        <li key={font.id} className={``}>
                          <button 
                            type="button" 
                            title={font.name}
                            className={`cursor-pointer flex flex-row items-center w-full h-full p-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fonts && fonts[fontSelection]?.id === font.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70 ring' : 'bg-base-50 dark:bg-base-900 ring-none'}`} 
                            onClick={() => updateTheme(projectId,"fonts", {[fontSelection]:{type: fontType, id: font.id, family: font.name}})}
                          >
                            <span className={`${font.id} text-2xl mr-auto`}>
                              {font.name}
                            </span>
                            {fonts && fonts[fontSelection]?.id === font.id ? 
                              <IoCheckmarkCircleSharp className='text-3xl'/>
                            : null}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                :
                  <>
                      <ul className="grid grid-cols-3 gap-4">
                      {localFonts?.length ?
                          localFonts.map((font) => {
                            return (
                                <li key={font.id} className={``}>
                                  <button 
                                    type="button" 
                                    title={font.name}
                                    className={`cursor-pointer flex flex-row items-center w-full h-full p-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fonts && fonts[fontSelection]?.id === font.id ? 'font-medium bg-base-200/70 dark:bg-base-700/70 ring' : 'bg-base-50 dark:bg-base-900 ring-none'}`} 
                                    onClick={() => updateTheme(projectId,"fonts", {[fontSelection]:{type: fontType, id: font.id, family: font.name}})}
                                  >
                                    <span className={`${font.id} text-2xl mr-auto`}>
                                      {font.name}
                                    </span>
                                    {fonts && fonts[fontSelection]?.id === font.id ? 
                                      <IoCheckmarkCircleSharp className='text-3xl'/>
                                    : null}
                                  </button>
                                </li>
                            )
                          })
                        : null}
                      </ul>
                      <div className="my-auto max-w-screen-sm mx-auto w-full flex flex-col space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <button 
                            className={`cursor-pointer justify-center flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${fromFile ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`} 
                            type="button" 
                            onClick={() => setFromFile(true)}
                          >
                            From File
                          </button>
                          <button 
                            className={`cursor-pointer justify-center flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${!fromFile ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`} 
                            type="button" 
                            disabled
                            onClick={() => setFromFile(false)}
                          >
                            From URL (Coming Soon)
                          </button>
                        </div>
                        {fromFile ?
                          <FileUpload 
                            label="Add A New Font"
                            pid={projectId}
                            type="fonts"
                            postUpload={addFont}
                            action="Add Font"
                          />
                        : 
                          <FontFromUrl pid={projectId} />
                        }
                      </div>
                    </>
                }
              </div>
            </div>
          </div>
        : null}
      </div>
    </>
  )
}
export default Theme