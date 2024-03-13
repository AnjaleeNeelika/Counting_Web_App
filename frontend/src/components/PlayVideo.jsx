import React from 'react'

const PlayVideo = ({ videoPath, onClose }) => {
    return (
        <div className='fixed inset-0 top-20 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md'>
            <button onClick={onClose} className='absolute top-0 right-0 m-4 text-white text-2xl'>&times;</button>
            <div className='w-96'>
                <video src={videoPath} className='w-full h-full' controls></video>
            </div>            
        </div>
    )
}

export default PlayVideo