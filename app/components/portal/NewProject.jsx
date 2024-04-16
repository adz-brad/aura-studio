'use client'

import { IoAdd } from "react-icons/io5";
import { IoMdThumbsUp } from "react-icons/io";
import { useState } from "react";
import Popup from "../ui/Popup";
import TextInput from "../forms/TextInput";
import Link from "next/link";
import { 
  createGitProject,
  createVercelProject,
  setVercelEnvVars,
  createDeployment,
  getDeploymentStatus,
  updateVercelDomain,
  verifyVercelDomain,
  refreshVercelDns
} from "@/app/lib/projects";
import uniqid from 'uniqid';
import slugify from "slugify";
import { arrayUnion, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useSession } from "next-auth/react";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";

const NewProject = () => {

  const router = useRouter()

  const [ newProject, setNewProject ] = useState(false)
  const [ status, setStatus ] = useState('Idle')
  const [ loading, setLoading ] = useState(false)
  const { data: session } = useSession()

  const createProject = async (data) => {
    setLoading(true)
    setStatus(<span className="text-sm font-medium">Initializing Project</span>)
    const userId = session?.user?.id
    const projectName = data.get("name")
    const name = `${slugify(projectName, { lower: true, strict: true })}-${uniqid()}`
    const gitId = await createGitProject(name)
    const vercelId = await createVercelProject(name, `adz-brad/${name}`)
    setStatus(<span className="text-sm font-medium">Configuring Build Environment</span>);
    await setVercelEnvVars(vercelId)
    const deploymentId = await createDeployment(name)
    setStatus(<span className="text-sm font-medium">Deploying Project</span>)
    let status;
    const timer = setInterval(async function () { 
      status = await getDeploymentStatus(deploymentId)
      if (status === "READY") {
        clearInterval(timer);
        setStatus(<span className="text-sm font-medium">Assigning Domain</span>)
        const { domain, verification } = await updateVercelDomain(vercelId,name).then((data) => { return data })
        await verifyVercelDomain(verification).then(async() => 
        {
          let status2;
          const timer2 = setInterval(async function () { 
              status2 = await refreshVercelDns(vercelId,domain)
              if(!status2.error) { clearInterval(timer2)}
            }
          )
        }, 5000)
        const project = {
            id: name,
            title: projectName,
            created: serverTimestamp(),
            updated: serverTimestamp(),
            status: "Live",
            data: { gitId: gitId, vercelId: vercelId, deploymentId: deploymentId },
            domain: domain,
            users: [{role: 'admin', userId: userId}],
        }
        await setDoc(doc(db, "projects", name), project)
        await updateDoc(doc(db, "users", userId), { projects: arrayUnion(name)})
        await setDoc(doc(db, 'projects',name,'stages','draft','theme','colors'), {
          'primary': { 'hex': '#0ea5e9', 'order': 0},
          'secondary': { 'hex': '#67b669', 'order': 1},
          'baseLight': { 'hex': '#e8e8e8', 'order': 2},
          'baseDark': { 'hex': '#0e0e0e', 'order': 3},
          'accentLight': { 'hex': '#5c98b3', 'order': 4},
          'accentDark': { 'hex': '#0a658e', 'order': 5},
        })
        await setDoc(doc(db, 'projects',name,'stages','draft','theme','fonts'), {
          'brand': { 'family': 'Quicksand', 'id': 'quicksand', 'type': 'google'},
          'body': { 'family': 'DM Sans', 'id': 'dm_sans', 'type': 'google'},
          'accent': { 'family': 'Fira Code', 'id': 'fira_code', 'type': 'google'},
        })
        // add step with default page, blocks in draft and published
        setStatus(<Link className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" href={`/studio/${name}`}>Launch Studio</Link>)
        setLoading(false)
      }
    }, 5000);
  }

  const close = () => {
    setStatus('Idle')
    setNewProject(false)
    router.refresh()
  }

  return (
    <>  
      <button
        title="Create New Project"
        className="flex flex-row items-center space-x-2 text-sm group z-50"
        onClick={() => setNewProject(true)}
      >
        <IoAdd className="text-2xl text-green-500 group-hover:scale-125 transition-all duration-200"/>
        <span className="text-lg">
          Create New Project
        </span>
      </button>
      {newProject && (
        <Popup title="Create New Project" close={loading ? null : () => close()}>
          <div className="flex flex-col justify-center items-center h-full">
            {status === "Idle" &&
              <form className="flex flex-col space-y-4 w-full" action={createProject}>
                <TextInput
                  label="Project Name"
                  name="name"
                  placeholder="Your Project Name"
                />
                <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full w-fit mx-auto" type="submit">
                  Create
                </button>
              </form>
            }
            <div className="flex flex-col space-y-4 items-center py-8">
            {loading === true && status !== "Idle" ? 
              <div className="animate-pulse"><ImSpinner2 className="animate-spin text-6xl text-brand-500" /></div>
            : loading === false && status !== "Idle" ?
              <div className="flex flex-col items-center space-y-2"><IoMdThumbsUp className="text-7xl text-green-600" /><span className="text-sm font-medium">Your Project Is Ready!</span></div>
            : null}
            {status !== "Idle" && status}
            </div>
          </div>
        </Popup> 
      )}
    </>
  )
}
export default NewProject