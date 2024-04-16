import Split from "react-split";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useRecoilValue } from "recoil";
import { menuIdState, projectIdState } from "./atoms";
import MenuInput from "./MenuInput";
import { MenuRenderWindow } from "./MenuRenderWindow";

const Menu = () => {

  const menuId = useRecoilValue(menuIdState)
  const projectId = useRecoilValue(projectIdState)
  const [ menuInput, setMenuInput ] = useState(null)
  const [ menuRender, setMenuRender ] = useState(null)

  useEffect(() => {
      if(menuId){
        const unsub = onSnapshot(doc(db, "projects", projectId, "stages", "draft", "menus", menuId), (doc) => setMenuInput({id: doc.id, ...doc.data()}))
        return () => unsub()
      }
  }, [ menuId ])

  useEffect(() => {
    if(menuInput?.isParent){
      setMenuRender(menuInput?.id)
    }
  }, [ menuInput ])

  return (
    <Split
        className="split"
        sizes={[35,65]}
        minSize={320}
        gutterSize={2}
    >
      <MenuInput block={menuInput} parentId={menuRender} />
      <MenuRenderWindow menu={menuRender} />
    </Split>
  )
}
export default Menu

