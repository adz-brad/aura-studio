import { getServerSession } from "next-auth"

export const metadata = {
  title: 'aura creative cloud',
}

const Portal = async () => {

  const session = await getServerSession()

  return (
    <div>Studio</div>
  )
}
export default Portal