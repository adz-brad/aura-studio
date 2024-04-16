import { updatePage, updatePageArray } from '@/app/lib/fetch';
import { StringArray, Text, TextArea } from './Inputs';
import { MdSettingsBackupRestore, MdOutlineUnpublished, MdOutlinePublishedWithChanges, MdOutlineAutorenew } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { projectIdState, pageGroupState, recoilThemeState } from './atoms';
import slugify from 'slugify';
import AIGenerate from './AIGenerate';
import Blocks from './Blocks';
import { query, onSnapshot, collection } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"

const PageInput = ({ page }) => {

  const projectId = useRecoilValue(projectIdState)

  const [ querySnap, setQuerySnap ] = useState(null)
  const [ theme, setTheme ] = useState(null)

  const setRecoilTheme = useSetRecoilState(recoilThemeState)

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

  useEffect(() => {
    if(theme){
      const colorData = theme?.filter(e => e.id === 'colors')[0]
      const colorArr = Object.entries(colorData).map((e) => { 
          let order = e[1].order
          delete e[1].order
          return { id:e[0], name: colorOptions.filter(o => o.value === e[0])[0]?.name, value:e[1], order: order }
        
      }).sort(function(a, b) { return a.order - b.order }).slice(1)
      const fontData = theme?.filter(e => e.id === 'fonts')[0]
      const defaultsData = theme?.filter(e => e.id === 'defaults')[0]
      setRecoilTheme({
        colors: colorArr,
        fonts: fontData,
        defaults: defaultsData
      })
    }
  }, [ theme ])

  const formRef = useRef()

  const [ group, setGroup ] = useRecoilState(pageGroupState)

  const slugFromTitle = (val) => {
    if(val && val !== page?.slug){
      updatePage(`projects/${projectId}/stages/draft/pages/${page?.id}`, { "slug": slugify(val, { lower: true, strict: true }) })
      page?.slug && formRef?.current?.Slug?.setAttribute('value', val)
    }
  }

  useEffect(() => {
    page?.name && formRef?.current?.Title?.setAttribute('value', page?.name)
    page?.slug && formRef?.current?.Slug?.setAttribute('value', page?.slug)
    page?.metatitle && formRef?.current?.Metatitle?.setAttribute('value', page?.metatitle)
    page?.description && formRef?.current?.Description?.setAttribute('value', page?.description)
  }, [ page ])

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g

  // SEO = image, schemamarkup
  // add min max tokens to ai gen
  // for seo, add google search result and opengraph (twitter card?) mockups
  // for blocks, add sidebar to naviagate blocks in current block
  // collapse menus onclick link (click page, collapse pages list)
  // add delete page to page toolbar

  return (
    <div className='flex flex-col space-y-3 px-4 pt-4'>
      <div className="flex flex-row space-x-4 items-center pb-2 border-b border-brand-500 ">
        <span className="font-semibold mr-auto text-sm">{page?.name ? page.name : "Untitled"}</span>
        <div className="flex flex-row space-x-1">
          <MdSettingsBackupRestore title="Discard Draft" as="button" className="text-2xl hover:scale-110 cursor-pointer hover:text-yellow-500" />
          <MdOutlineUnpublished title="Unpublish Page" as="button" className="text-2xl hover:scale-110 cursor-pointer hover:text-red-500" />
          <MdOutlinePublishedWithChanges title="Publish" as="button" className="text-2xl hover:scale-110 cursor-pointer hover:text-green-500" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button 
          className={`cursor-pointer flex flex-row items-center justify-center py-1 px-2 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${group === 'Details' ? 'bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-950'}`}
          onClick={() => setGroup("Details")}
        >
          Details
        </button>
        <button 
          className={`cursor-pointer flex flex-row items-center justify-center py-1 px-2 rounded-md hover:shadow-md bg-base-200/70 dark:hover:bg-base-700/70 ${group === 'Blocks' ? 'bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-950'}`}
          onClick={() => setGroup("Blocks")}
        >
          Blocks
        </button>
        <button 
          className={`cursor-pointer flex flex-row items-center justify-center py-1 px-2 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${group === 'SEO' ? 'bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-950'}`}
          onClick={() => setGroup("SEO")}
        >
          SEO
        </button>
      </div>
      <form ref={formRef} className="flex flex-col grow" autoComplete="off">

          <div className={`flex-col space-y-6 ${group === "Details" ? 'flex' : 'hidden'}`}>
            <div className="flex flex-row items-center">
              <Text
                label="Title"
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                _key="name"
                onChange={updatePage}
                placeholder="Add A Title For Your Page"
                initialValue={page?.name}
                minMax={[30,60]}
              />
              <AIGenerate 
                useInput={true}
                title="Generate Page Title With AI"
                prompt="Generate a minimum 30 character length, maximum 50 character length, unique, SEO-optimized web page title about this topic:"
                update={updatePage}
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                name="name"
              />
            </div>
            <div className="flex flex-row items-center">
            <Text
              label="Slug"
              path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
              _key="slug"
              onChange={updatePage}
              placeholder="The URL Your Page Lives At"
              initialValue={page?.slug}
            />
              <button type="button" title="Generate Slug From Title" onClick={() => slugFromTitle(page?.name)}><MdOutlineAutorenew className='text-2xl'/></button>
            </div>
          </div>
        
          <div className={`flex-col space-y-6 ${group === "SEO" ? 'flex' : 'hidden'}`}>
            <div className="flex flex-row items-center">
              <TextArea
                rows={3}
                label="Metatitle"
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                _key="metatitle"
                onChange={updatePage}
                placeholder="Add An SEO-Friendly Metatitle For Your Page"
                initialValue={page?.metatitle}
                minMax={[45,78]}
              />
              <AIGenerate 
                title="Generate Metatitle With AI"
                useInput={false}
                prompt={`Generate a minimum 45 character length, maximum 68 character length, unique, SEO-optimized web page meta title describing ${page?.name}`}
                update={updatePage}
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                name="metatitle"
              />
            </div>
            <div className="flex flex-row items-center">
              <TextArea
                label="Description"
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                _key="description"
                onChange={updatePage}
                placeholder="Add An SEO-Friendly Description For Your Page"
                initialValue={page?.description}
                rows={3}
                minMax={[50,160]}
              />
              <AIGenerate 
                title="Generate Meta Description With AI"
                useInput={false}
                prompt={`Generate a minimum 50 character length, maxiumum 150 character length, unique, SEO-optimized web page meta description describing ${page?.name}`}
                update={updatePage}
                path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
                name="description"
              />
            </div>
            <StringArray
              label="Keywords"
              path={`projects/${projectId}/stages/draft/pages/${page?.id}`}
              _key="keywords"
              onChange={updatePageArray}
              values={page?.keywords}
              placeholder="Add An SEO-Friendly Keyword For Your Page"
            />
          </div>
        
          <div className={group === "Blocks" ? 'flex flex-row grow' : 'hidden'}>
            <Blocks />
          </div>

      </form>
    </div>
  )
}
export default PageInput