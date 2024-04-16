import Link from "next/link";

const ProjectList = ({ projects }) => {
  return (
    <ul className="grid grid-cols-2 gap-8">
      {projects.map((project) => {

        const { id, title, domain, status, updated } = project
        const updateDate = new Date(updated.seconds*1000)
        
        return (
          <li key={id} className="flex flex-row group z-40">
            <div className="relative h-36 w-64 overflow-hidden">
              <span className="absolute top-1 left-1 bg-base-100/70 dark:bg-base-900/70 z-50 px-2 py-1 rounded-full flex flex-row items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={status === 'Live'? {backgroundColor: '#22c55e'} : status === 'Offline' ? {backgroundColor: '#ef4444'} : {backgroundColor: '#eab308'}}/>
                <span className="text-xs font-medium">
                  {status}
                </span>
              </span>
              {domain &&
                <div
                  className="rounded-lg shadow-md brightness-50 group-hover:brightness-100 transition-all duration-200 w-full aspect-video overflow-hidden"
                  title={`Project Thumbnail for ${title}`}
                >
                  <iframe src={`https://${domain}`} className="rounded-lg shadow-md h-[1000%] w-[1000%] scale-[0.1] origin-[0_0]"/>
                </div>
              }
            </div>
            <div className="flex flex-col justify-end grow px-8">
              <div className="flex flex-col space-y-1">
                <span className="text-lg font-semibold">{title}</span>
                <span className="text-base-700 dark:text-base-500 text-sm">Updated {updateDate.toLocaleString()}</span>
              </div>

              <Link 
                href={`/studio/${id}`}
                className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full mt-auto text-center" 
                prefetch={false}
              >
                Open Project
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
export default ProjectList