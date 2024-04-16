import * as icons from 'react-icons/io5'

const IconInput = ({ current, set }) => {
    const iconArr = Object.entries(icons)
  return (
    <div className="h-full pt-8 overflow-hidden">
    <ul className='h-full grid grid-cols-5 p-8 gap-y-4 overflow-y-auto overflow-x-hidden twScroll'>
        {iconArr?.length > 0 ?
            iconArr.map((icon,i) => {
                const name = icon[0]?.substring(2)
                const Icon = icon[1]
                return (
                    <li key={i} className='flex flex-col'>
                        <button 
                            className={`flex flex-col justify-center items-center space-y-3 group p-2 rounded-md ${current === icon[0] ? 'ring' : 'hover:ring'}`}
                            type="button"
                            onClick={() => set(icon[0])}
                        >
                            <Icon className={`text-4xl ${current === icon[0] ? 'text-brand-500 scale-105' : 'group-hover:text-brand-500 group-hover:scale-105'} transition-all`} />
                            <span className={`text-xs font-medium ${current === icon[0] ? 'font-semibold' : 'group-hover:font-semibold'}`}>{name}</span>
                        </button>
                    </li>
                )
            })
        : null }
    </ul>
    </div>
  )
}
export default IconInput