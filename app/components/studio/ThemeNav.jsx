import { useRecoilState } from "recoil"
import { themeNavState } from "./atoms"

const ThemeNav = () => {

    const options = ['Colors','Fonts']
    const [ option, setOption ] = useRecoilState(themeNavState)

    return (

        <ul className="flex flex-col grow space-y-2 py-1">
            {options?.map((e) => {
                return (
                    <li 
                        title={e}
                        key={e}
                        as="button" 
                        onClick={() => setOption(e)}
                        className={`cursor-pointer text-sm flex flex-row items-center py-2 px-3 rounded-md hover:shadow-md hover:bg-base-200/70 dark:hover:bg-base-700/70 ${option === e ? 'font-medium bg-base-200/70 dark:bg-base-700/70' : 'bg-base-50 dark:bg-base-900'}`}
                    >
                        {e}
                    </li>
                )
            })}
        </ul>

    )
}
export default ThemeNav