'use server'

import { db, storage } from "./firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { doc, query, where, collection, getDoc, getDocs, documentId, addDoc, deleteDoc, setDoc, updateDoc, arrayUnion, serverTimestamp, arrayRemove, deleteField } from "firebase/firestore"
import uniqid from 'uniqid'
import slugify from "slugify"

export const getProject = async (pid) => {
    const res = await getDoc(doc(db, "projects", pid))
    return res.data()
}

export const getProjects = async (userProjects) => {
    let projects = []
    if(userProjects.length){
      const q = query(collection(db, "projects"), where(documentId(), 'in', userProjects))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => projects.push({id: doc.id, ...doc.data()}))
    }
    const sorted = projects.sort(function(x,y){return y.updated.seconds - x.updated.seconds})
    return sorted
}

export const updateTheme = async (pid, item, value) => {
  await updateDoc(doc(db, "projects", pid, "stages", "draft", "theme", item), {
    ...value 
  })
}

export const getFiles = async (path) => {
  const listRef = ref(storage,path)
  let files = []
  listAll(listRef).then((res) => {
    res.items?.forEach((item) => {
      files.push(getDownloadURL(item).then((url) => console.log(url)))
    })
  })
}

export const getFile = async (path) => {
  return await getDownloadURL(ref(storage, path))
}

export const uploadFile = async (pid,type,data) => {
  const file = data.get('fileUpload')
  const path = `${pid}/${type}`
  const filePath = `${path}/${uniqid(`${type}-`,`-${slugify(file.name, { lower: true })}`)}`
  const fileRef = ref(storage, filePath)
  return await uploadBytes(fileRef, file).then((snapshot) => snapshot.ref._location.path_)
}

export const addFont = async (pid,name,path) => {
  let url = await getDownloadURL(ref(storage,path))
  const id = slugify(name, { lower: true})
  updateTheme(pid, "fonts", {"local": arrayUnion({name: name, id: id, css: `              
    @font-face {
      font-family: "${name}";
      src: url('${url}');
    }
  `})})
}

export const uploadImage = async (pid,data,name) => {
  const file = data.get('imageUpload')
  const path = `${pid}/images`
  const filePath = `${path}/${uniqid(`images-`,`-${slugify(name ? name : file.name, { lower: true, remove: /[*+~.()'"!:@]/g })}`)}`
  const fileRef = ref(storage, filePath)
  return await uploadBytes(fileRef, file).then((snapshot) => snapshot.ref._location.path_)
}

export const addImage = async (pid,name,data,hash) => {
  let path = await uploadImage(pid,data,name)
  const id = slugify(name ? `image-${uniqid(name,'')}` : uniqid('image-',''), { lower: true, remove: /[*+~.()'"!:@]/g})
  let url = await getDownloadURL(ref(storage,path))
  await setDoc(doc(db, "projects", pid, "images", id), {
    "name": name ? name : '', 
    "url": url,
    "hash": hash,
    "created": serverTimestamp(),
    "updated": serverTimestamp()
  })
  return {
    "id": id,
    "name": name ? name : '', 
    "url": url,
    "hash": hash,
  }
}

export const getPages = async (pid) => {
  let pages = []
  const q = query(collection(db, "projects", pid, "stages", "draft", "pages"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => pages.push({id: doc.id, ...doc.data()}))
  return pages
}

export const createPage = async (pid) => {
  await setDoc(doc(db, "projects", pid, "stages", "draft", "pages", uniqid('page-','')), {
    created: serverTimestamp(),
    updated: serverTimestamp()
  })
}

export const updatePage = async (path,data) => {
  await updateDoc(doc(db, path), {
    "updated": serverTimestamp(), 
    ...data
  })
}

export const updateValue = async (path,data,parentPath) => {
  if(parentPath){
    await updateDoc(doc(db, parentPath), {
      "updated": serverTimestamp()
    })
    await updateDoc(doc(db, path), {
      "updated": serverTimestamp(), 
      ...data
    })
  }
  else{
    await updateDoc(doc(db, path), {
      "updated": serverTimestamp(), 
      ...data
    })
  }
}

export const deleteValue = async (path,item,parentPath) => {
  if(parentPath){
    await updateDoc(doc(db, parentPath), {
      "updated": serverTimestamp(),
    })
    await updateDoc(doc(db, path), {
      "updated": serverTimestamp(), 
      [item]: deleteField()
    })
  }
  await updateDoc(doc(db, path), {
    "updated": serverTimestamp(), 
    [item]: deleteField()
  })
}

export const updateItem = async (path,data) => {
  await updateDoc(doc(db, path), {
    "updated": serverTimestamp(), 
    ...data
  })
}

export const updatePageArray = async (path, key, value, fn) => {
  await updateDoc(doc(db, path), {
    "updated": serverTimestamp(), 
    [key]: fn === "add" ? arrayUnion(value) : arrayRemove(value) 
  })
}

export const publishPage = async (path) => {
  await updateDoc(doc(db,path), {
    "published": serverTimestamp()
  })
}

export const getBlocks = async (arr) => {
  let blocks = []
  arr.map(async(block) => {
    const data = await getDoc(block)
    blocks.push(data)
  })
  return blocks
}

export const addBlock = async (pid,pageId,path,parent,order) => {
  const id = await addDoc(collection(db, "projects", pid, "stages", "draft", "pages", pageId, "blocks"), {
    created: serverTimestamp(),
    updated: serverTimestamp(),
    title: `Block ${order+1}`,
    order: order,
    type: "standard",
    element:"Box",
    parent: parent ? parent : null
  }).then((res) => res.id)
    const docRef = doc(db, `projects/${pid}/stages/draft/pages/${pageId}/blocks/${id}`)
    await updateDoc(doc(db, path), {
      "updated": serverTimestamp(), 
      "blocks": arrayUnion(docRef)
    })
  return id
}

export const deleteBlock = async (pid,pageId,blockId,parentId) => {
  const blockRef = doc(db, "projects", pid, "stages", "draft", "pages", pageId, "blocks", blockId)
  const parentRef = parentId ? doc(db, "projects", pid, "stages", "draft", "pages", pageId, "blocks", parentId) : doc(db, "projects", pid, "stages", "draft", "pages", pageId)
  await deleteDoc(blockRef)
  await updateDoc(parentRef, {
    "updated": serverTimestamp(), 
    "blocks": arrayRemove(blockRef)
  })
}

export const getTheme = async (pid) => {
  let theme = []
  const q = query(collection(db, "projects", pid, "stages", "draft", "theme"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => pages.push({id: doc.id, ...doc.data()}))
  return theme
}

export const discardDraft = async (path) => {
  //set doc as copy of published
}

export const getCustomBlocks = async (pid) => {
  let blocks = []
  const q = query(collection(db, "projects", pid, "stages", "draft", "customBlocks"), where("isParent", "==", true))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    blocks.push({id: doc.id, title: data.title})
  })
  return blocks
}

export const createCustomBlock = async (pid,parent,order) => {
  if(!parent){
    await addDoc(collection(db, "projects", pid, "stages", "draft", "customBlocks"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      title: "New Custom Block",
      type: "standard",
      element:"Box",
      isParent: true,
      parent: null,
      order: null
    })
  }
  else{
    const id = await addDoc(collection(db, "projects", pid, "stages", "draft", "customBlocks"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      type: "standard",
      element:"Box",
      isParent: false,
      parent: parent,
      title: `Block ${order+1}`,
      order: order
    }).then((res) => res.id)
    const docRef = doc(db, `projects/${pid}/stages/draft/customBlocks/${id}`)
    await updateDoc(doc(db, `projects/${pid}/stages/draft/customBlocks/${parent}`), {
      "updated": serverTimestamp(), 
      "blocks": arrayUnion(docRef)
    })
    return id
  }
}

export const createMenu = async (pid,parent,order) => {
  if(!parent){
    await addDoc(collection(db, "projects", pid, "stages", "draft", "menus"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      title: "New Menu Item",
      type: "standard",
      element:"Box",
      isParent: true,
      parent: null,
      order: null
    })
  }
  else{
    const id = await addDoc(collection(db, "projects", pid, "stages", "draft", "menus"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      type: "standard",
      element:"Box",
      isParent: false,
      parent: parent,
      title: `Menu Block ${order+1}`,
      order: order
    }).then((res) => res.id)
    const docRef = doc(db, `projects/${pid}/stages/draft/menus/${id}`)
    await updateDoc(doc(db, `projects/${pid}/stages/draft/menus/${parent}`), {
      "updated": serverTimestamp(), 
      "blocks": arrayUnion(docRef)
    })
    return id
  }
}

export const deleteCustomBlock = async (pid,blockId,parentId) => {

  const blockRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", blockId)
  const blockDoc = await getDoc(blockRef).then((doc) => {
    const data = doc.data()
    const { blocks } = data
    return {id: doc.id, blocks: blocks}
  })
  if(blockDoc?.id && parentId){
    const parentRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", parentId)
    if(parentRef){
      await updateDoc(parentRef, {
        "updated": serverTimestamp(), 
        "blocks": arrayRemove(blockRef)
      })
    }
  }
  let deleteList = []
  deleteList.push(blockDoc.id)
  if(blockDoc?.blocks){
    const fetch = async (arr) => {
      return await Promise.all(arr.map(async(block) => {
        const doc = await getDoc(block)
        const data = {id: doc.id, ...doc.data()}
        const { id, blocks: children } = data
        deleteList.push(id)
        return {
          blocks: children ? await fetch(children) : null
        }
      }))
    }
    await fetch(blockDoc.blocks)
  }
  if(deleteList?.length > 0){
    deleteList.map(async(item) => {
      const deleteRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", item)
      await deleteDoc(deleteRef)
    })
  }
}

export const deleteMenuBlock = async (pid,blockId,parentId) => {

  const blockRef = doc(db, "projects", pid, "stages", "draft", "menus", blockId)
  const blockDoc = await getDoc(blockRef).then((doc) => {
    const data = doc.data()
    const { blocks } = data
    return {id: doc.id, blocks: blocks}
  })
  if(blockDoc?.id && parentId){
    const parentRef = doc(db, "projects", pid, "stages", "draft", "menus", parentId)
    if(parentRef){
      await updateDoc(parentRef, {
        "updated": serverTimestamp(), 
        "blocks": arrayRemove(blockRef)
      })
    }
  }
  let deleteList = []
  deleteList.push(blockDoc.id)
  if(blockDoc?.blocks){
    const fetch = async (arr) => {
      return await Promise.all(arr.map(async(block) => {
        const doc = await getDoc(block)
        const data = {id: doc.id, ...doc.data()}
        const { id, blocks: children } = data
        deleteList.push(id)
        return {
          blocks: children ? await fetch(children) : null
        }
      }))
    }
    await fetch(blockDoc.blocks)
  }
  if(deleteList?.length > 0){
    deleteList.map(async(item) => {
      const deleteRef = doc(db, "projects", pid, "stages", "draft", "menus", item)
      await deleteDoc(deleteRef)
    })
  }
}

export const copyCustomBlock = async (pid,copyId,length,targetId) => {
  const parentRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", copyId)
  const parentDoc = await getDoc(parentRef).then((doc) => {
    const data = doc.data()
    const { created, updated, ...rest } = data
    return rest
  })
  if(parentDoc){
    const { title, order, parent, blocks, ...rest } = parentDoc
    const newParentId = await addDoc(collection(db, "projects", pid, "stages", "draft", "customBlocks"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      title: title ? `${title} Copy` : 'Untitled Copy',
      order: length,
      parent: targetId ? targetId : null,
      ...rest
    }).then((res) => res.id)
    if(targetId){
      const newDocRef = doc(db, `projects/${pid}/stages/draft/customBlocks/${newParentId}`)
      await updateDoc(doc(db, `projects/${pid}/stages/draft/customBlocks/${targetId}`), {
        "updated": serverTimestamp(), 
        "blocks": arrayUnion(newDocRef)
      })
    }
    if(newParentId && blocks?.length > 0){
      blocks.map(async(block) => {
        const child = await getDoc(block).then((doc) => doc.id)
        if(child){
          copyCustomBlock(pid,child,blocks.length,newParentId)
        }
      })
    }
  }
}

export const copyMenuBlock = async (pid,copyId,length,targetId) => {
  const parentRef = doc(db, "projects", pid, "stages", "draft", "menus", copyId)
  const parentDoc = await getDoc(parentRef).then((doc) => {
    const data = doc.data()
    const { created, updated, ...rest } = data
    return rest
  })
  if(parentDoc){
    const { title, order, parent, blocks, ...rest } = parentDoc
    const newParentId = await addDoc(collection(db, "projects", pid, "stages", "draft", "menus"), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      title: title ? `${title} Copy` : 'Untitled Copy',
      order: length,
      parent: targetId ? targetId : null,
      ...rest
    }).then((res) => res.id)
    if(targetId){
      const newDocRef = doc(db, `projects/${pid}/stages/draft/menus/${newParentId}`)
      await updateDoc(doc(db, `projects/${pid}/stages/draft/menus/${targetId}`), {
        "updated": serverTimestamp(), 
        "blocks": arrayUnion(newDocRef)
      })
    }
    if(newParentId && blocks?.length > 0){
      blocks.map(async(block) => {
        const child = await getDoc(block).then((doc) => doc.id)
        if(child){
          copyMenuBlock(pid,child,blocks.length,newParentId)
        }
      })
    }
  }
}


export const useCustomMenuBlock = async (pid,copyId,length,targetId,isInit,parentId) => {
  const copyRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", copyId)
  const copyDoc = await getDoc(copyRef).then((doc) => {
    const data = doc.data()
    const { created, updated, isParent, ...rest } = data
    return rest
  })
  const { title, blocks, order, parent, ...rest } = copyDoc
  if(isInit){
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "menus", targetId), {
      "updated": serverTimestamp(),
      "order": length,
      ...rest
    })
  }
  else {
    const newId = await addDoc(collection(db, "projects", pid, "stages", "draft", "menus"), {
      "updated": serverTimestamp(),
      "order": length,
      parent: targetId,
      title: title,
      ...rest
    }).then((res) => res.id)
    const newBlockRef = doc(db, "projects", pid, "stages", "draft", "menus", newId)
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "menus", targetId), {
      updated: serverTimestamp(),
      blocks: arrayUnion(newBlockRef),
    })
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "menus", parentId), {
      updated: serverTimestamp(),
    })
  }
  if(blocks?.length > 0){
    blocks.map(async(childRef) => {
      await getDoc(childRef).then(async(childDoc) => {
        const data = childDoc.data()
        const { blocks: childBlocks, created, updated, parent, ...rest } = data
        const id = await addDoc(collection(db, "projects", pid, "stages", "draft", "menus"), {
          created: serverTimestamp(),
          updated: serverTimestamp(),
          parent: targetId,
          ...rest
        }).then((res) => res.id)
        const childBlockRef = doc(db, "projects", pid, "stages", "draft", "menus", id)
        await updateDoc(doc(db, "projects", pid, "stages", "draft", "menus", targetId), {
          updated: serverTimestamp(),
          blocks: arrayUnion(childBlockRef),
        })
        if(childBlocks?.length > 0){
          childBlocks.map(async(blockRef,i) => {
            await getDoc(blockRef).then((childBlockDoc) => {
              const docId = childBlockDoc.id
              useCustomMenuBlock(pid,docId,i,id,null,parentId)
            })
          })
        }
      })
    })
  }
  else {
    return
  }
}

export const useCustomBlock = async (pid,copyId,length,targetId,isInit,parentId) => {
  const copyRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", copyId)
  const copyDoc = await getDoc(copyRef).then((doc) => {
    const data = doc.data()
    const { created, updated, isParent, ...rest } = data
    return rest
  })
  const { title, blocks, order, parent, ...rest } = copyDoc
  if(isInit){
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "customBlocks", targetId), {
      "updated": serverTimestamp(),
      "order": length,
      ...rest
    })
  }
  else {
    const newId = await addDoc(collection(db, "projects", pid, "stages", "draft", "customBlocks"), {
      "updated": serverTimestamp(),
      "order": length,
      parent: targetId,
      title: title,
      ...rest
    }).then((res) => res.id)
    const newBlockRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", newId)
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "customBlocks", targetId), {
      updated: serverTimestamp(),
      blocks: arrayUnion(newBlockRef),
    })
    await updateDoc(doc(db, "projects", pid, "stages", "draft", "customBlocks", parentId), {
      updated: serverTimestamp(),
    })
  }
  if(blocks?.length > 0){
    blocks.map(async(childRef) => {
      await getDoc(childRef).then(async(childDoc) => {
        const data = childDoc.data()
        const { blocks: childBlocks, created, updated, parent, ...rest } = data
        const id = await addDoc(collection(db, "projects", pid, "stages", "draft", "customBlocks"), {
          created: serverTimestamp(),
          updated: serverTimestamp(),
          parent: targetId,
          ...rest
        }).then((res) => res.id)
        const childBlockRef = doc(db, "projects", pid, "stages", "draft", "customBlocks", id)
        await updateDoc(doc(db, "projects", pid, "stages", "draft", "customBlocks", targetId), {
          updated: serverTimestamp(),
          blocks: arrayUnion(childBlockRef),
        })
        if(childBlocks?.length > 0){
          childBlocks.map(async(blockRef,i) => {
            await getDoc(blockRef).then((childBlockDoc) => {
              const docId = childBlockDoc.id
              useCustomBlock(pid,docId,i,id,null,parentId)
            })
          })
        }
      })
    })
  }
  else {
    return
  }
}
