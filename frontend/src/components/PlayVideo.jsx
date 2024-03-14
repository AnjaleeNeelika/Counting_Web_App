import React from 'react'

const PlayVideo = ({ videoPath, onClose }) => {
    return (
        <div className='fixed inset-0 top-20 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md overflow-auto p-10'>
            <button onClick={onClose} className='absolute top-0 right-0 m-4 text-white text-2xl'>&times;</button>
            {/* <div className='max-w-[700px] h-[600px] bg-slate-300 flex justify-center items-center'>
                <video src={videoPath} className='h-full' controls></video>
            </div>             */}
            <div className='h-[70vh] mx-auto'>
                <video src={videoPath} controls className='h-full'></video>
            </div>
        </div>
    )
}

export default PlayVideo