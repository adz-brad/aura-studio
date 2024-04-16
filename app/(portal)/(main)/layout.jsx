import { getServerSession } from "next-auth"
import ContactButton from "../../components/contact/ContactButton"
import MainNavbar from "../../components/nav/MainNavbar"
import { authOptions } from "../../lib/auth"

export const metadata = {
  title: 'aura | creative cloud',
}

export default async function SiteLayout({ children }) {

  let user;
  const session= await getServerSession(authOptions)
  if(session?.user){
    user = session.user
  }
  
  return (
    <main className="fixed h-full w-full overflow-auto">
      <MainNavbar user={user} />
      <ContactButton />
      <div className="w-full h-[calc(100%-80px)] overflow-auto">
        {children}
      </div>
    </main>
  )
}
