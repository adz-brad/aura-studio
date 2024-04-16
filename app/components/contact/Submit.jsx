import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from "react-icons/im";

const Submit = ({ text }) => {

    const { pending } = useFormStatus()

  return (
    <div className='pt-8 flex flex-col items-center'>
                        {pending ? 
                        <ImSpinner2 className="text-3xl animate-spin text-brand-600" /> 
                    :
                        <button 
                            type="submit" 
                            aria-disabled={pending} 
                            disabled={pending}
                            className="text-lg font-medium text-base-950 dark:text-base-50 bg-transparent border border-base-400 w-fit px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200"
                        >
                            {text}
                        </button>
                    }
    </div>
  )
}
export default Submit