import React from 'react'

const InputText = (props) => {
    return (
        <div className='relative'>
            <input 
                type={props.type}
                name="email" 
                id="email"
                className='peer h-10 px-4 w-full border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-[#ca9a9a] placeholder-transparent'
                placeholder={props.label}
            />
            <label 
                htmlFor="email" 
                className='absolute bg-white left-4 -top-3 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3 peer-focus:text-[#ca9a9a] peer-focus:font-semibold peer-focus:text-sm'
            >
                {props.label}
            </label>
        </div>
    )
}

export default InputText