import React from 'react';

const EmptyError = (props) => {
    return (
        <div className='w-full max-w-[600px] mx-auto p-3 my-4 bg-[#ffecd4] text-[#f86f03] text-sm text-center border-2 border-[#f86f03] rounded-md shadow-lg'>
            {props.message}
        </div>
    )
}

export default EmptyError