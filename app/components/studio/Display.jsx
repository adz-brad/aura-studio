import { useRecoilValue } from "recoil"
import { displayState } from "./atoms"
import Page from "./Page"
import Menu from "./Menu"
import Dashboard from "./Dashboard"
import Settings from "./Settings"
import Theme from "./Theme"
import Media from "./Media"
import Performance from "./Performance"
import CustomBlock from "./CustomBlock"

const Display = () => {
  const display = useRecoilValue(displayState)
  return (
    <div className="flex grow pr-4">
        <div className="grow h-full">
            {display === "Pages" ? <Page />
            : display === "Blog" ? <>Blog</>
            : display === "Menus" ? <Menu />
            : display === "Theme" ? <Theme />
            : display === "Media" ? <Media />
            : display === "Templates" ? <>Templates</>
            : display === "Blocks" ? <CustomBlock />
            : display === "Settings" ? <Settings />
            : display === "Dashboard" ? <Dashboard />
            : display === "Performance" ? <Performance/>
            : null
            }
        </div>
    </div>
  )
}
export default Display