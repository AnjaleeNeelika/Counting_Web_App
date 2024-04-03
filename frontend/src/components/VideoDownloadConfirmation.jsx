import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

const VideoDownloadConfirmation = ({ onClose }) => {
    const location = useLocation();
    const currentLocation = location.pathname;

    return (
        <div className='fixed top-20 left-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
            <div className='w-full md:w-[500px] bg-white p-10 rounded-lg shadow'>
                <div className='flex justify-end mb-3'>
                    <button onClick={onClose} className='text-[#643843]'>
                        <AiOutlineClose />
                    </button>
                </div>
                <h2 className='mb-5'>Are you sure you want to download the snippet?</h2>
                <div className='flex justify-around items-center gap-10'>
                    <Link
                        to={{
                            pathname: '/video-input-type/downloaded-videos'
                        }}
                    >
                        <button className='bg-[#643843] w-16 text-white text-md py-1.5 rounded-md shadow-md hover:bg-[#854857] hover:-translate-y-1 duration-300'>Yes</button>
                    </Link>
                    
                    <button onClick={onClose} className='bg-[#643843] w-16 text-white text-md py-1.5 rounded-md shadow-md hover:bg-[#854857] hover:-translate-y-1 duration-300'>No</button>
                </div>
            </div>
        </div>
    )
}

export default VideoDownloadConfirmation