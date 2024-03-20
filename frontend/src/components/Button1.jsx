import React from 'react'

const Button1 = (props) => {
    return (
        <div className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer' onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default Button1