import Page from "@/app/components/portal/Page";
import NewProject from "@/app/components/portal/NewProject";
import ProjectList from "@/app/components/ui/ProjectList";
import { getProjects } from "@/app/lib/fetch";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: 'Projects',
}

const Projects = async () => {

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
    <Page
      title="Projects"
      cta={<NewProject/>}
      component={<span className="opacity-50">Search / Sort / Pagination</span>}
    >
      <ProjectList projects={projects} />
    </Page>
  )
}
export default Projects