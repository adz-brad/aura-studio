import Split from "react-split";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import BlockInput from "./BlockInput";
import { useRecoilValue } from "recoil";
import { customBlockIdState, projectIdState } from "./atoms";
import { BlockRenderWindow } from "./BlockRenderWindow";

const CustomBlock = () => {

  const blockId = useRecoilValue(customBlockIdState)
  const projectId = useRecoilValue(projectIdState)
  const [ blockInput, setBlockInput ] = useState(null)
  const [ blockRender, setBlockRender ] = useState(null)

  useEffect(() => {
      if(blockId){
        const unsub = onSnapshot(doc(db, "projects", projectId, "stages", "draft", "customBlocks", blockId), (doc) => setBlockInput({id: doc.id, ...doc.data()}))
        return () => unsub()
      }
  }, [ blockId ])

  useEffect(() => {
    if(blockInput?.isParent){
      setBlockRender(blockInput?.id)
    }
  }, [ blockInput ])

  return (
    <Split
        className="split"
        sizes={[35,65]}
        minSize={320}
        gutterSize={2}
    >
      <BlockInput block={blockInput} parentId={blockRender} />
      <BlockRenderWindow block={blockRender} />
    </Split>
  )
}
export default CustomBlock

