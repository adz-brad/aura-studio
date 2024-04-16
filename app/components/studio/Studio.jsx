import { useEffect } from "react";
import Display from "./Display";
import DisplayNav from "./DisplayNav";
import StudioNav from "./StudioNav";
import { useSetRecoilState } from "recoil";
import { projectIdState, recoilThemeState } from "./atoms";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const Studio = ({ id }) => {

    const setProjectId = useSetRecoilState(projectIdState)
    const setTheme = useSetRecoilState(recoilThemeState)

    const colorOptions = [
        {name: 'Primary', value: 'primary'},
        {name: 'Secondary', value: 'secondary'},
        {name: 'Accent (light)', value: 'accentLight'},
        {name: 'Accent (dark)', value: 'accentDark'},
        {name: 'Base (light)', value: 'baseLight'},
        {name: 'Base (dark)', value: 'baseDark'},
      ]

    useEffect(() => {
        setProjectId(id)
        const getTheme = async () => {
            let theme = []
            const docs = await getDocs(collection(db, "projects", id, "stages", "draft", "theme"))
            docs.forEach((doc) => {
                theme.push({id: doc.id, ...doc.data()})
            })
            if(theme.length){
                const colorData = theme?.filter(e => e.id === 'colors')[0]
                const colorArr = Object.entries(colorData).map((e) => { 
                    let order = e[1].order
                    delete e[1].order
                    return { id:e[0], name: colorOptions.filter(o => o.value === e[0])[0]?.name, value:e[1], order: order }
                  
                }).sort(function(a, b) { return a.order - b.order }).slice(1)
                const fontData = theme?.filter(e => e.id === 'fonts')[0]
                const defaultsData = theme?.filter(e => e.id === 'defaults')[0]
                setTheme({
                  colors: colorArr,
                  fonts: fontData,
                  defaults: defaultsData
                })
              }
        }
        getTheme()
    }, [ id ])



    return (
            <div className="fixed bottom-4 left-0' h-[calc(100vh-90px)] w-full flex flex-row divide-x-2 divide-base-200 dark:divide-base-900">
                <StudioNav />
                <DisplayNav />
                <Display />
            </div>
    )

}
export default Studio