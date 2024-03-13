import React from 'react';

const ReportModal = ({ onClose }) => {
  return (
    <div className='fixed top-20 left-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
        <div className='w-full md:w-[500px] bg-white p-5 rounded-lg shadow'>
            <h2 className='w-fit mx-auto'>Report</h2>
            <div className='w-full my-5'>
                <div className='flex justify-between items-center'>
                    <span>Report No: 1</span>
                    <span>Date: 07/03/2024</span>                    
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <button onClick={onClose} className='w-fit px-5 py-2 bg-[#a87499] hover:bg-[#ca8cb9] rounded-md shadow-md text-white mx-auto'>Close</button>
            </div>
        </div>
    </div>
  )
}

export default ReportModal