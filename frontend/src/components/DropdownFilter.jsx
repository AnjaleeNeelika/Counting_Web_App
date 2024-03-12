import React from 'react';

const DropdownFilter = (props) => {
    const onFilterValueChanged = (e) => {
        props.filterValueSelected(e.target.value);
    } 

    return (
        <div className='w-72 relative lg:max-w-sm'>            
            <select onChange={onFilterValueChanged} className='w-full outline-none hover:cursor-pointer p-2.5 text-gray-500 bg-white border rounded-md shadow-sm appearance-none focus:border-[#bd9db4]'>
                <option value='all' className='hover:bg-[#bd9db4] p-2'>All</option>
                <option value='date'>Sort By Date</option>
                <option value='name'>Sort By Name</option>
                <option value='duration'>Sort By Duration</option>
            </select>
        </div>
    )
}

export default DropdownFilter