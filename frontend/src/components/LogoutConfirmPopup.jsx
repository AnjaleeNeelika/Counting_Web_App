import React from 'react';

const LogoutConfirmPopup = ({ confirmLogout, cancelLogout }) => {
    return (
        <div className='fixed top-20 left-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
            <div className='w-full md:w-[500px] bg-white p-5 rounded-lg shadow text-center'>
                <p>Are yu sure you want to logout?</p>
                <div className='w-full flex justify-around items-center mt-5 text-sm'>
                    <button onClick={confirmLogout} className='bg-[#a87c7c] w-16 p-2 rounded-md shadow-md'>Yes</button>
                    <button onClick={cancelLogout} className='bg-[#a87c7c] w-16 p-2 rounded-md shadow-md'>No</button>
                </div>                
            </div>
        </div>
    )
}

export default LogoutConfirmPopup