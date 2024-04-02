import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const VideoInputDevice = ({ onClose, nextPath }) => {
    return (
        <div className='fixed top-20 left-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
            <div className='w-full md:w-[500px] bg-white p-5 rounded-lg shadow'>
                <div className='flex justify-end mb-3'>
                    <button onClick={onClose} className='text-[#643843]'>
                        <AiOutlineClose />
                    </button>
                </div>
                <h2 className='w-fit mx-auto text-[#99627a]'>Select A Video Input Device</h2>
                <div className='w-full mt-5 flex justify-center items-center'>
                    <Link
                        to={{
                            pathname: nextPath
                        }}
                    >
                        <button className='bg-[#643843] text-white text-sm px-5 py-2 rounded-full mx-auto'>Continue</button>
                    </Link>                    
                </div>
            </div>
        </div>
    )
}

export default VideoInputDevice