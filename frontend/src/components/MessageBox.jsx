import React from 'react';

const MessageBox = (props) => {
    return (
        <div>
            {props.type === 'warning' ? (
                <div className='w-full max-w-[600px] mx-auto p-3 my-4 bg-[#ffecd4] text-[#f86f03] text-sm text-center border-2 border-[#f86f03] rounded-md shadow-lg'>
                    {props.message}
                </div>
            ) : (props.type === 'error' ? (
                <div className='w-full max-w-[600px] mx-auto p-3 my-4 bg-[#ffd4d4] text-[#f80303] text-sm text-center border-2 border-[#f80303] rounded-md shadow-lg'>
                    {props.message}
                </div>
            ) : (props.type === 'success' ? (
                <div className='w-full max-w-[600px] mx-auto p-3 my-4 bg-[#d7ffd4] text-[#44a344] text-sm text-center border-2 border-[#44a344] rounded-md shadow-lg'>
                    {props.message}
                </div>
            ) : (
                <div></div>
            )))}
        </div>        
    )
}

export default MessageBox;