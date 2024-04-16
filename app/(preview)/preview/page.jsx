'use client'

import { useState, useEffect } from "react"
import Chakra from "../../components/studio/ChakraProvider"
import Render from "../../components/studio/Render"
import { extendTheme } from "@chakra-ui/react"
import { query, onSnapshot, collection } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import { Alegreya,Antonio,Archivo,Arimo,Assistant,Bitter,Cabin,Cormorant,Crimson_Pro,DM_Sans,Dosis,Exo_2,Fira_Code,Inter,Libre_Franklin,Lora,Merriweather_Sans,Montserrat,Open_Sans,Oswald,Playfair_Display,Raleway,Rubik,Source_Sans_3,Roboto_Flex, Quicksand} from 'next/font/google'
import { useSearchParams } from 'next/navigation'

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
  { id: 'alegraya', name: 'Alegreya', font: alegraya},
  { id: 'antonio', name: 'Antonio', font: antonio},
  { id: 'archivo', name: 'Archivo', font: archivo},
  { id: 'arimo', name: 'Arimo', font: arimo},
  { id: 'assistant', name: 'Assistant', font: assistant},
  { id: 'bitter', name: 'Bitter', font: bitter},
  { id: 'cabin', name: 'Cabin', font: cabin},
  { id: 'coromorant', name: 'Cormorant', font: coromorant},
  { id: 'crimson_pro', name: 'Crimson Pro', font: crimson_pro},
  { id: 'dm_sans', name: 'DM Sans', font: dm_sans},
  { id: 'dosis', name: 'Dosis', font: dosis},
  { id: 'exo_2', name: 'Exo 2', font: exo_2},
  { id: 'fira_code', name: 'Fira Code', font: fira_code},
  { id: 'inter', name: 'Inter', font: inter},
  { id: 'libre_franklin', name: 'Libre Franklin', font: libre_franklin},
  { id: 'lora', name: 'Lora', font: lora},
  { id: 'merriweather_sans', name: 'Merriweather Sans', font: merriweather_sans},
  { id: 'montserrat', name: 'Montserrat', font: montserrat},
  { id: 'open_sans', name: 'Open Sans', font: open_sans},
  { id: 'oswald', name: 'Oswald', font: oswald},
  { id: 'playfair_display', name: 'Playfair Display', font: playfair_display},
  { id: 'quicksand', name: 'Quicksand', font: quicksand },
  { id: 'raleway', name: 'Raleway', font: raleway},
  { id: 'roboto_flex', name: 'Roboto Flex', font: roboto_flex},
  { id: 'rubik', name: 'Rubik', font: rubik},
  { id: 'source_sans_3', name: 'Source Sans 3', font: source_sans_3},
]

const PagePreview = () => {

  const params = useSearchParams()
  const projectId = params.get('projectId')
  const pageId = params.get('pageId')

  if(!projectId) {
    return <>Preview Unavailable</>
  }

  else {
 
    const [ querySnap, setQuerySnap ] = useState(null)
    const [ chakraTheme, setChakraTheme ] = useState(extendTheme({}))
    const [ theme, setTheme ] = useState(null)
    const [ fontStyles, setFontStyles ] = useState([])

    useEffect(() => {
      if(projectId && !querySnap){
          const col = query(collection(db, "projects", projectId, "stages", "draft", "theme"))
          const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
          return () => unsub()
      }
    }, [ projectId ])

    useEffect(() => {
      if(querySnap){
          setTheme(querySnap.map((doc) => { 
            return {
            id: doc.id, ...doc.data()
          }}))
      }
    }, [ querySnap ])

    useEffect(() => {
      if(theme){
        const colors = theme?.filter(e => e.id === 'colors')[0]
        const fonts = theme?.filter(e => e.id === 'fonts')[0]
        const defaults = theme?.filter(e => e.id === 'defaults')[0]
        let fontFamilies = {}
        let styles = []
        const fontArr = [{class: 'brand', ...fonts.brand},{class: 'accent', ...fonts.accent},{class: 'body', ...fonts.body}]
        fontArr.map((font) => {
          if(font.type === 'google'){
            const el = googleFonts.filter(e => e.id === font.id)[0]
            fontFamilies[font.class] = el.font.style.fontFamily
          }
          else if(font.type === 'local'){
            const el = fonts.local.filter(e => e.id === font.id)[0]
            fontFamilies[font.class] = el.name
            styles.push(el.css)
          }
        })
        setFontStyles(styles)
        setChakraTheme(extendTheme({
          colors: {
            primary: colors.primary.hex,
            secondary: colors.secondary.hex,
            baseLight: colors.baseLight.hex,
            baseDark: colors.baseDark.hex,
            accentLight: colors.accentLight.hex,
            accentDark: colors.accentDark.hex,
          },
          fonts: {
            brand: fontFamilies.brand,
            accent: fontFamilies.accent,
            body: fontFamilies.body
          },
          styles: {
            global: {
              body: {
                position: 'relative',
                bg: colors[defaults.backgroundColor]?.hex,
                color: colors[defaults.bodyText]?.hex,
              },
            }
          }
        }))
      }
    }, [ theme ])

    return (
      <Chakra theme={chakraTheme}>
        {fontStyles.length ?
          fontStyles.map((font) => {
            return (
                <style>
                  {font.normalize()}
                </style>
            )
          })
        : null}
        <Render projectId={projectId} pageId={pageId} />
      </Chakra>
    )
  }
}
export default PagePreview