import PortalNavbar from "../../components/nav/PortalNavbar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth";
import { getProjects } from "../../lib/fetch";

export const metadata = {
  title: 'aura creative cloud',
}


export default async function PortalLayout({ children }) {

  let user;
  const session= await getServerSession(authOptions)
  if(session?.user){
    user = session.user
  }

  let projects;
  if(user){
    const { projects : data } = user
    projects = await getProjects(data)
  }

  return (
    <>
      <PortalNavbar 
        user={user} 
        projects={projects}
      />
      <div className="fixed bottom-0 left-0 w-full h-[calc(100%-80px)] overflow-auto px-2 pb-4">
        {user ? children
        : <>Sign In</> }
      </div>
    </>
  )
}
