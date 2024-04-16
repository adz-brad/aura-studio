const Page = ({ title, children, cta, component }) => {
  return (
    <div className="flex flex-col space-y-8 h-full max-w-screen-xl mx-auto">
        <div className="flex flex-row items-center pb-2 border-b border-base-500 mt-4">
            <span className="text-2xl font-semibold font-brand">
                {title}
            </span>
            <div className="flex grow justify-center">
              {component}
            </div>
            {cta}
        </div>
        <div className="flex flex-col space-y-8 h-[calc(100%-53px)] overflow-y-auto">
            {children}
        </div>
    </div>
  )
}
export default Page