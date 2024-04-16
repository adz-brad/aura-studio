const TextInput = ({ name, label, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
        <label htmlFor={name}>
            {label}
        </label>
        <input 
            type="text" 
            name={name}
            placeholder={placeholder}
        />
    </div>
  )
}
export default TextInput