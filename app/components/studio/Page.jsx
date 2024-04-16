import Split from "react-split";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import PageInput from "./PageInput";
import { useRecoilValue } from "recoil";
import { pageIdState, projectIdState } from "./atoms";
import { RenderWindow } from "./RenderWindow";

const Page = () => {

  const pageId = useRecoilValue(pageIdState)
  const projectId = useRecoilValue(projectIdState)
  const [ page, setPage ] = useState(null)

  useEffect(() => {
      if(pageId){
        const unsub = onSnapshot(doc(db, "projects", projectId, "stages", "draft", "pages", pageId), (doc) => setPage({id: doc.id, ...doc.data()}))
        return () => unsub()
      }
  }, [ pageId ])

  return (
    <Split
        className="split"
        sizes={[35,65]}
        minSize={320}
        gutterSize={2}
    >
      <PageInput page={page} />
      <RenderWindow />
    </Split>
  )
}
export default Page

