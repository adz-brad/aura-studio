import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect, useMemo, useTransition } from 'react';
import { IoMdAddCircleOutline, IoMdRemove } from "react-icons/io";
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { ColorPicker, useColor } from 'react-color-palette'
import { uploadFile, addImage } from '@/app/lib/fetch';
import ReactSlider from 'react-slider';

export const SimpleText = ({ 
  label,
  onChange,
  placeholder,
  initialValue,
  minMax,
}) => {

  const [ length, setLength ] = useState(initialValue ? initialValue.length : 0)
  const [ text, setText ] = useState(initialValue)

  const update = useDebouncedCallback((val) => {
    onChange(val)
  }, 300)

  useEffect(() => {
    setText(initialValue)
    setLength(initialValue?.length ? initialValue.length : 0)
  }, [ initialValue ])

  useEffect(() => {
    if(text !== initialValue){
      update(text)
      setLength(text?.length ? text.length : 0)
    }
  }, [ text ])

  return  (
  <div className='flex flex-col pageInput'>
    <div className="flex flex-row items-center space-x-3">
      {minMax && <span className={`h-2 w-2 rounded-full ${length > minMax[0] && length < minMax[1] ? 'bg-green-500' : 'bg-red-500'}`} /> }
      <label htmlFor={label} className='text-sm font-semibold'>
        {label}
      </label>
    </div>
    <input 
      type="text" 
      name={label} 
      id={label}
      onChange={(e) => setText(e.target.value)} 
      value={text}
      placeholder={placeholder}
    />
  </div>
  )
}

export const Text = ({ 
  label,
  onChange,
  path,
  _key,
  placeholder,
  initialValue,
  minMax,
}) => {

  const [ length, setLength ] = useState(initialValue ? initialValue.length : 0)
  const [ text, setText ] = useState(initialValue)

  const update = useDebouncedCallback((p,k,v) => {
    onChange(p,{[k]:v})
  }, 350)

  useEffect(() => {
    setText(initialValue)
    setLength(initialValue?.length ? initialValue.length : 0)
  }, [ initialValue ])

  useEffect(() => {
    if(text !== initialValue){
      update(path,_key,text)
      setLength(text?.length ? text.length : 0)
    }
  }, [ text ])

  return  (
  <div className='flex flex-col pageInput'>
    <div className="flex flex-row items-center space-x-3">
      {minMax && <span className={`h-2 w-2 rounded-full ${length > minMax[0] && length < minMax[1] ? 'bg-green-500' : 'bg-red-500'}`} /> }
      <label htmlFor={label} className='text-sm font-semibold'>
        {label}
      </label>
    </div>
    <input 
      type="text" 
      name={label} 
      id={label}
      onChange={(e) => setText(e.target.value)} 
      value={text}
      placeholder={placeholder}
    />
  </div>
  )
}

export const TextArea = ({ 
  label,
  onChange,
  path,
  _key,
  placeholder,
  initialValue,
  rows,
  minMax
}) => {

  const [ length, setLength ] = useState(initialValue ? initialValue.length : 0)

  useEffect(() => {
    setLength(initialValue ? initialValue.length : 0)
  }, [ initialValue])

  const update = useDebouncedCallback((p,k,v) => {
    setLength(v?.length ? v.length : 0)
    onChange(p,{[k]:v})
  }, 100)

  return  (
  <div className='flex flex-col pageInput'>
    <div className="flex flex-row items-center space-x-3">
      {minMax && <span className={`h-2 w-2 rounded-full ${length > minMax[0] && length < minMax[1] ? 'bg-green-500' : 'bg-red-500'}`} /> }
      <label htmlFor={label} className='text-sm font-semibold'>
        {label}
      </label>
    </div>
    <textarea 
      rows={rows}
      name={label} 
      id={label}
      onChange={(e) => update(path,_key,e.target.value)} 
      placeholder={placeholder}
      defaultValue={initialValue}
    />
  </div>
  )
} 

export const StringArray = ({
  label,
  values,
  onChange,
  placeholder,
  path,
  _key
}) => {

  const [ value, setValue ] = useState('')

  const handleChange = (v,fn) => {
    if(v?.length > 0) {
      onChange(path, _key, v, fn)
      fn === "add" && setValue('')
    }
  }

  return (
    <div className='flex flex-col space-y-6 pageInput'>
      <div className="flex flex-row items-center space-x-4 w-full">
        <div className='flex flex-col pageInput'>
          <label htmlFor={label} className='text-sm font-semibold'>
            {label}
          </label>
          <input 
            type="text" 
            name={label} 
            id={label}
            onChange={(e) => setValue(e.target.value)} 
            value={value}
            placeholder={placeholder}
          />
        </div>
        <button 
          title="Add Keyword" 
          className="hover:text-green-500"
          onClick={() => handleChange(value,"add")}
          type="button"
        >
          <IoMdAddCircleOutline className="text-2xl"/>
        </button>
      </div>
      {values?.length ?
        <ul className="flex flex-row flex-wrap space-evenly gap-3">
          {values.map((val) => {
            return (
              <li className="flex flex-row items-center text-sm font-medium px-3 py-1 space-x-2 bg-base-200/70 dark:bg-base-700/70 hover:bg-base-300/70 hover:dark:bg-base-500/70 rounded-3xl cursor-default" key={val}>
                <span>
                  {val}
                </span>
                <button 
                  title={`Remove ${val} from ${label}`} 
                  type="button" 
                  onClick={() => handleChange(val, "remove")}
                  className='hover:scale-125 hover:brightness-125'
                >
                  <IoMdRemove className='text-red-500'/>
                </button>
              </li>
          )})}
        </ul>
      : null}
    </div>
  )
}

export const Select = ({
  label,
  onChange,
  path,
  _key,
  placeholder,
  options,
  value
}) => {
  return (
    <div className='flex flex-col pageInput'>
      <label htmlFor={label} className='text-sm font-semibold'>{label}</label>
      <select name={label} id={label} className='text-sm' value={value ? value : placeholder} onChange={(e) => onChange(path,{[_key]:e.target.value})}>
        <option key="placeholder" className='bg-base-50 dark:bg-base-950 text-base-700/50 dark:text-base-300/50 m-1' disabled value={placeholder}>{placeholder}</option>
        {options?.map((option) => {
          return (
            <>
              {option?.group ?
                <optgroup className='bg-base-50 dark:bg-base-950 text-semibold' label={option.group} key={option.group}>
                  {option.groupOptions?.map((option) => {
                    return (
                      <option className='bg-base-50 dark:bg-base-950' key={option.value} value={option.value}>{option.name}</option>
                    )
                  })}
                </optgroup>
              : <option className='bg-base-50 dark:bg-base-950 m-1' key={option.value} value={option.value}>{option.name}</option>
              }
          </>
          )
        })}
      </select>
    </div>
  )
}

export const SimpleSelect = ({
  label,
  onChange,
  placeholder,
  options,
  value
}) => {
  return (
    <div className='flex flex-col pageInput'>
      <label htmlFor={label} className='text-sm font-semibold'>{label}</label>
      <select name={label} id={label} className='text-sm' value={value ? value : placeholder} onChange={onChange}>
        <option key="placeholder" className='bg-base-50 dark:bg-base-950 m-1 text-base-700/50 dark:text-base-300/50' disabled value={placeholder}>{placeholder}</option>
        {options?.map((option) => {
          return (
            <>
              {option?.group ?
                <optgroup className='bg-base-50 dark:bg-base-950 text-semibold' label={option.group} key={option.group}>
                  {option.groupOptions?.map((option) => {
                    return (
                      <option className='bg-base-50 dark:bg-base-950' key={option.value} value={option.value}>{option.name}</option>
                    )
                  })}
                </optgroup>
              : <option className='bg-base-50 dark:bg-base-950 m-1' key={option.value} value={option.value}>{option.name}</option>
              }
          </>
          )
        })}
      </select>
    </div>
  )
}

export const Code = ({
  label,
  onChange,
  path,
  _key,
  placeholder,
  value
}) => {

  const [ code, setCode ] = useState(value ? value : '')

  const update = useDebouncedCallback((p,k,v) => {
    onChange(p,{[k]:v})
  }, 200)

  useEffect(() => {
    if(code !== value){
      update(path,_key,code)
    }
  }, [ code ])

    return (
      <div className='flex flex-col pageInput w-full'>
        <label htmlFor={label} className='text-sm font-semibold'>{label}</label>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          placeholder={placeholder}
          highlight={code => hljs.highlightAuto(code, ['css','javascript']).value}
          padding={5}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
          textareaId={`codeInput-${_key}`}
          textareaClassName='max-w-[360px] bg-transparent border-0 border-b focus:border-brand-600 focus:ring-0 text-base-950 dark:text-base-50'
          preClassName='max-w-[360px] bg-transparent border-0 border-b focus:border-brand-600 focus:ring-0 text-base-950 dark:text-base-50'
        />
      </div>
  )
}

export const RichText = ({
  label,
  onChange,
  path,
  _key,
  placeholder,
  value,
  className
}) => {

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const [editorState, setEditorState] = useState(value ? value : '')

  const update = useDebouncedCallback((p,k,v) => {
    onChange(p,{[k]:v})
  }, 200)

  useEffect(() => {
    if(editorState !== value){
      update(path,_key,editorState)
    }
  }, [ editorState ])

  return (
    <div className={`flex-col pageInput w-full ${className ? className : ''}`}>
      <label htmlFor={label} className='text-sm font-semibold'>{label}</label>
      <ReactQuill placeholder={placeholder} value={editorState} onChange={setEditorState} />
    </div>
  )
}

export const Color = ({current, onChange}) => {

  const [color, setColor] = useColor(current)

  const update = useDebouncedCallback((p) => {
    onChange(p)
  }, 300)

  useEffect(() => {
    if(color.hex !== current) {
      update(color)
    }
  }, [ color ])

  return (
    <ColorPicker color={color} onChange={setColor} />
  )
}

export const FileUpload = ({label, pid, type, postUpload, action}) => {

  const [ pending, startTransition ] = useTransition()
  const [ name, setName ] = useState('')
  const [ file, setFile ] = useState(null)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  const handleSubmit = () => {
    const form = new FormData();
    form.append("fileUpload", file);
    startTransition(async() => {
      const res = await uploadFile(pid,type,form)
      postUpload(pid,name,res)
    });
    setName('')
    setFile(null)
  };

  return (
    <div className='flex flex-col pageInput w-full space-y-4'>
      <label htmlFor={label} className='text-sm font-semibold'>{label}</label>
      <input autoComplete='off' type="text" name="fileName" id="fileName" placeholder='Enter A File Name' value={name} onChange={(e) => setName(e.target.value)}/>
      <input type="file" onChange={handleChange} />
      <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => handleSubmit()}>{action}</button>
    </div>
  )
}

export const FontFromUrl = ({ pid }) => {
  const [ url, setUrl ] = useState('')
  const [ name, setName ] = useState('')
  const handleSubmit = () => {
    console.log(name,url)
  }
  return (
    <div className='flex flex-col pageInput w-full space-y-4'>
      <label htmlFor="fontUrl" className='text-sm font-semibold'>Add Font From URL</label>
      <input autoComplete='off' type="text" name="fontName" id="fontName" placeholder="Enter Font Name" value={name} onChange={(e) => setName(e.target.value)}/>
      <input autoComplete='off' type="text" name="fontUrl" id="fontUrl" placeholder="Enter Font URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
      <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => handleSubmit()}>Add Font</button>
    </div>
  )
}

export const Slider = ({}) => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
/>
  )
}

export const Radio =({ label, value, options, onChange }) => {
  return (
    <div className='flex flex-col pageInput w-full space-y-4'>
      <span className='text-sm font-semibold'>{label}</span>
      <div className="flex flex-row flex-wrap space-x-4 pl-1">
        {options?.map((option,i) => {
          return (
            <div className="flex flex-row items-center space-x-2">
              <input type="radio" name={label} id={option.name} value={option.value} checked={value === option.value} onChange={onChange} />
              <label htmlFor={option.name} className='text-sm'>{option.name}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Number = ({ label, value, defaultVal, min, max, step, onChange }) => {

  const [ number, setNumber ] = useState(value ? value : defaultVal)

  const update = useDebouncedCallback((val) => {
    onChange(val)
  }, 150)

  useEffect(() => {
    if(value !== number){
      update(number)
    }
  }, [ number ])

  const round = (value, step) => {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

  const handleInputChange = (val) => {
    if(step % 1 !== 0){
      const rounded = round(val,step)
      parseFloat(rounded) >= parseFloat(min) && parseFloat(rounded) <= parseFloat(max) && rounded.length !== 0 ? setNumber(parseFloat(rounded)) : parseFloat(rounded) < parseFloat(min) ? setNumber(min) : parseFloat(rounded) > parseFloat(max) ? setNumber(max) : rounded.length === 0 ? setNumber(defaultVal) : setNumber(defaultVal)
    }
    else {
      parseInt(val) >= min && parseInt(val) <= max && val.length !== 0 ? setNumber(parseInt(val)) : parseInt(val) < min ? setNumber(min) : parseInt(val) > max ? setNumber(max) : val.length === 0 ? setNumber(defaultVal) : setNumber(defaultVal)
    }
  }

  return (
    <div className='flex flex-col space-y-2'>
      <div className="flex flex-row items-center space-x-3">
        <label htmlFor={label} className='text-sm font-semibold'>
          {label}
        </label>
      </div>
      <div className="flex flex-row items-center space-x-4 my-auto">
        <input 
          min={min}
          max={max}
          step={step}
          type="number"
          className='max-w-[50px] text-center p-1 numberInput'
          value={number.toString().replace( /[^0-9.]/g,'')}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="flex flex-row items-center space-x-2">
          <button 
            title={`Decrease ${label} by ${step} ( Min. ${min} )`}
            type="button" 
            disabled={value ? parseFloat(value) <= parseFloat(min) : defaultVal <= min} 
            onClick={value ? parseFloat(value) > parseFloat(min) ? () => setNumber(value-step) : null : defaultVal > min ? () => setNumber(defaultVal-step) : null}
            className={`w-6 h-6 leading-none rounded-full flex items-center justify-center font-bold border border-base-500/50 ${parseFloat(value) <= parseFloat(min)  ? 'hover:text-red-500' : 'hover:text-brand-500'}`}
          >
            -
          </button>
          <button 
            title={`Increase ${label} by ${step} ( Max. ${max} )`}
            type="button" 
            disabled={value ? parseFloat(value) >= parseFloat(max) : defaultVal >= max} 
            onClick={value ? parseFloat(value) < parseFloat(max) ? () => setNumber(value+step) : null : defaultVal < max ? () => setNumber(defaultVal+step) : null}
            className={`w-6 h-6 leading-none pb-[1px] rounded-full flex items-center justify-center border border-base-500/50 font-bold ${parseFloat(value) >= parseFloat(max)  ? 'hover:text-red-500' : 'hover:text-brand-500'}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export const SimpleNumber = ({ label, value, defaultVal, min, max, step, onChange }) => {

  const [ number, setNumber ] = useState(value ? value : defaultVal)

  const handleChange = (val) => {
    if(val.length === 0){
      setNumber('')
    }
    if(val === '-'){
      setNumber('-')
    }
    else{
      setNumber(val)
    }
  }

  const update = useDebouncedCallback((val) => {
    onChange(val)
  }, 50)

  useEffect(() => {
    if(value !== number && !isNaN(number)){
      update(parseInt(number))
    }
  }, [ number ])

  return (
    <div className='flex flex-col space-y-2'>
      <div className="flex flex-row items-center space-x-3">
        <label htmlFor={label} className='text-sm font-semibold'>
          {label}
        </label>
      </div>
      <div className="flex flex-row items-center space-x-4 my-auto">
        <input 
          min={min}
          max={max}
          step={step}
          type="text"
          inputMode='numeric'
          className='max-w-[50px] text-center p-1 numberInput'
          value={number}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="flex flex-row items-center space-x-2">
          <button 
            title={`Decrease ${label} by ${step} ( Min. ${min} )`}
            type="button" 
            disabled={value ? value <= min : defaultVal <= min} 
            onClick={value ? value > min ? () => setNumber(value-step) : null : defaultVal > min ? () => setNumber(defaultVal-step) : null}
            className={`w-6 h-6 leading-none rounded-full flex items-center justify-center font-bold border border-base-500/50 ${parseFloat(value) <= parseFloat(min)  ? 'hover:text-red-500' : 'hover:text-brand-500'}`}
          >
            -
          </button>
          <button 
            title={`Increase ${label} by ${step} ( Max. ${max} )`}
            type="button" 
            disabled={value ? value >= max : defaultVal >= max} 
            onClick={value ? value < max ? () => setNumber(value+step) : null : defaultVal < max ? () => setNumber(defaultVal+step) : null}
            className={`w-6 h-6 leading-none pb-[1px] rounded-full flex items-center justify-center border border-base-500/50 font-bold ${parseFloat(value) >= parseFloat(max)  ? 'hover:text-red-500' : 'hover:text-brand-500'}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export const Checkbox = ({ label, value, onChange }) => {
  return (
      <label className="flex flex-row items-center space-x-3 checkbox-wrapper">
        <input 
          checked={value ? true : false}
          type="checkbox"
          onChange={onChange}
        />
        <span htmlFor={label} className='text-sm font-semibold'>
          {label}
        </span>
    </label>
  )
}

export const ImageUpload = ({images, pid, set}) => {

  const [ pending, startTransition ] = useTransition()
  const [ name, setName ] = useState(null)
  const [ image, setImage ] = useState(null)
  const [ key, setKey ] = useState(Math.random().toString(36))

  const useHash = async (file) => {
    let buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  function handleChange(event) {
    setImage(event.target.files[0])
  }

  const handleSubmit = async () => {
    const hash = await useHash(image)
    const filter = images.filter(e => e.hash === hash)[0]
    if(!filter){
      const form = new FormData();
      form.append("imageUpload", image);
      startTransition(async() => {
        const res = await addImage(pid,name,form,hash)
        set(res)
      });
      setName('')
      setImage(null)
      setKey(Math.random().toString(36))
    }
    else {
      set(filter)
    }
  };

  return (
    <div className='flex flex-col pageInput w-full space-y-4'>
      <label htmlFor="imageUpload" className='text-sm font-semibold'>Choose An Image File</label>
      {image ?
        <>
          <img src={URL.createObjectURL(image)} />
          <label htmlFor="imageName" className='text-sm font-semibold'>Name Your Image (optional)</label>
          <input autoComplete='off' type="text" name="imageName" id="imageName" placeholder='Enter An Image Name' value={name} onChange={(e) => setName(e.target.value)}/>
        </>
      : null}
      <input key={key} name="imageUpload" id="imageUpload" type="file" onChange={handleChange} />
      <button className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full" type="button" onClick={() => handleSubmit()}>Upload</button>
    </div>
  )
}

export const ImageInput = ({pid}) => {
  return(
    <></>
  )
}
