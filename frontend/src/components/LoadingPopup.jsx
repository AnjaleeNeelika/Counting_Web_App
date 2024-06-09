import React from 'react';

const LoadingPopup = (props) => {
    return (
        <div className='fixed left-0 h-[92%] w-full bg-[#a8a2a2] bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
            <div>
                {/* message */}
                <div className='text-center text-[#a87c7c] font-semibold capitalize' style={{ letterSpacing: '0.5rem' }}>{props.message}</div>
                
                <div className="flex gap-2 w-fit mx-auto mt-3">
                    <div className="w-4 h-4 bg-[#a87c7c] rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-[#a87c7c] rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-[#a87c7c] rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-[#a87c7c] rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-[#a87c7c] rounded-full animate-pulse"></div>
                </div>
            </div>
            
        </div>
    )
}

export default LoadingPopup