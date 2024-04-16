import { useRecoilValue } from "recoil"
import { mediaNavState, projectIdState } from "./atoms"
import { IoAddCircleOutline } from "react-icons/io5";
import { collection, query, orderBy, onSnapshot, getDoc } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import { useEffect, useState } from "react";
import { ImageUpload, Text } from "./Inputs";
import Image from "next/image";
import { updatePage } from "@/app/lib/fetch";

const Media = ({set, use}) => {

  const type = useRecoilValue(mediaNavState)
  const projectId = useRecoilValue(projectIdState)
  const [ mode, setMode ] = useState(null)

  const [ querySnap, setQuerySnap ] = useState(null)
  const [ media, setMedia ] = useState(null)
  const [ selected, setSelected ] = useState(null)

  useEffect(() => {
    if(projectId){
      if(use){
        if(use === "Images"){
          const col = query (collection(db, "projects", projectId, "images"), orderBy("created", "desc"))
          const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
          return () => unsub()
        }
      }
      else {
        if(type === "Images"){
          const col = query (collection(db, "projects", projectId, "images"), orderBy("created", "desc"))
          const unsub = onSnapshot(col,(snap) => setQuerySnap(snap.docs))
          return () => unsub()
        }
      }
    }   
  }, [ projectId, type ])

  useEffect(() => {
      if(querySnap){
          setMedia(querySnap.map((doc) => { return {id: doc.id, ...doc.data()}}))
      }
  }, [ querySnap ])

  const selectMedia = (e) => {
    if(set){
      set(e)
    }
    else{
      setMode('edit')
      setSelected(e)
    }
  }


  return (

    <div className={`flex flex-row pt-3 ${mode ? 'px-8' : 'pl-8'} h-full`}>
      <div className="flex flex-col space-y-8 grow">
        <div className='flex'>
          <span className="text-lg font-medium">
            {type}
          </span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  overflow-y-auto twScroll pr-8 mr-1">
          <li>
            <button 
              type="button"
              className="flex flex-col space-y-2 items-center justify-center h-[120px] md:h-[150px] lg:h-[200px] w-full shadow-md rounded-md border border-base-500/50 group hover:bg-base-200/70 dark:hover:bg-base-700/30"
              title={`Upload ${type === "Images" ? 'Image' : type === 'Videos' ? 'Video' : 'File'}`}
              onClick={() => setMode('upload')}
            >
              <IoAddCircleOutline className="group-hover:text-green-500 text-5xl"/>
              <span>Upload Image</span>
            </button>
          </li>
        {media?.length > 0 ?
          media.map((item) => {
            return (
              <li key={item?.id} id={item?.id}>
                <button 
                  type="button"
                  className={`relative flex flex-col space-y-2 items-center justify-center h-[120px] md:h-[150px] lg:h-[200px] w-full shadow-md rounded-md ${selected?.id === item?.id ? 'border-2 border-brand-500' : 'border border-base-500/50'} group hover:border-2 hover:border-brand-500 hover:bg-base-200/70 dark:hover:bg-base-700/30 overflow-hidden`}
                  title={`Select ${type === "Images" ? 'Image' : type === 'Videos' ? 'Video' : 'File'}`}
                  onClick={() => selectMedia(item)}
                >
                  <Image 
                    src={item?.url} 
                    alt="Select Media Image" 
                    quality={75}
                    sizes="(max-width: 1920px) 400px"
                    fill
                    className="object-contain group-hover:scale-110 transition-all duration-300"
                  />
                </button>
              </li>
            )
          })
        : null}
        </ul>
      </div>
      {mode ?
      <div className="flex flex-col space-y-6 border-l border-base-500/30 grow max-w-[300px] pl-8">
      
        <div className='flex'>
          <span className="text-lg font-medium">
              {mode === "edit" ? 
                 type === "Images" ? 'Image Details' : type === 'Videos' ? 'Video Details' : 'File Details'
                : mode === "upload" ? 
                 type === "Images" ? 'Image Upload' : type === 'Video' ? 'Video Upload' : 'File Upload'
                : null
              }
          </span>
        </div>
        
          {mode === "edit" ?
            type === "Images" ? 
              <Text
                label="Name"
                path={`projects/${projectId}/images/${selected?.id}`}
                _key="name"
                onChange={updatePage}
                placeholder="The Name of the Image"
                initialValue={selected?.name}
              />
              : type === 'Videos' ? 
                'Video Details Input' 
                : 'File Details Input'
              : mode === "upload" ?
                type === "Images" ? 
                  <ImageUpload pid={projectId} images={media} set={selectMedia} /> 
                : type === 'Video' ? 
                  'Video Upload Input' 
                : 'File Upload Input'
            : null}
      </div>
  : null}
    </div>

  )
}
export default Media