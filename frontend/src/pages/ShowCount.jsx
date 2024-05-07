import React, { useEffect, useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BiListCheck, BiStopCircle,  } from 'react-icons/bi';
import ReportModal from '../components/ReportModal';

const ShowCount = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const handlePause = (() => {
        setIsPaused(!isPaused);
    }); 

    const handleStop = (() => {
        setIsStopped(true);
    });

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setSeconds(prevSeconds => prevSeconds + 1);
        // }, 1000);

        // return () => clearInterval(interval);
        let interval;
        if (!isPaused && !isStopped) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    })

    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
            {showPopup && <ReportModal onClose={() => setShowPopup(false)} />}
            <div className='w-full md:w-fit'>
                <div className='w-fit mx-auto bg-white p-5 shadow-md mb-10 rounded-md'>
                    <div className='w-full flex flex-wrap justify-center items-center gap-10 mb-10'>
                        <div className='w-36 md:w-56 p-7 bg-[#866078] rounded-md shadow text-white text-center'>
                            <h3 className='mb-3 text-base md:text-lg'>Time (In Seconds)</h3>
                            <div className='text-4xl md:text-5xl'>{seconds}</div>
                        </div>
                        <div className='w-36 md:w-56 p-7 bg-[#866078] rounded-md shadow text-white text-center'>
                            <h3 className='mb-3 text-base md:text-lg'>Finished Count</h3>
                            <div className='text-4xl md:text-5xl'>100</div>
                        </div>
                    </div>
                        
                    <div className='w-full flex flex-wrap justify-center md:justify-evenly items-center gap-5'>
                        {isPaused ? (
                            <button onClick={handlePause} className='border-2 border-[#b0578d] rounded-full shadow-md py-2 px-5 text-xs text-[#b0578d] font-medium flex justify-between items-center gap-2 hover:bg-[#b3809e] hover:text-white'>
                                <AiOutlinePlayCircle className='text-xl' />
                                RESUME COUNTING
                            </button>
                        ) : (
                            <button onClick={handlePause} className='border-2 border-[#b0578d] rounded-full shadow-md py-2 px-5 text-xs text-[#b0578d] font-medium flex justify-between items-center gap-2 hover:bg-[#b3809e] hover:text-white'>
                                <AiOutlinePauseCircle className='text-xl' />
                                PAUSE COUNTING
                            </button>
                        )}
    
    
                        {isStopped ? (
                            <button onClick={() => setShowPopup(true)} className='border-2 border-[#b0578d] rounded-full shadow-md py-2 px-5 text-xs text-[#b0578d] font-medium flex justify-between items-center gap-2 hover:bg-[#b3809e] hover:text-white'>
                                <BiListCheck className='text-xl' />
                                GENERATE REPORT
                            </button> 
                        ) : (
                            <button onClick={handleStop} className='border-2 border-[#b0578d] rounded-full shadow-md py-2 px-5 text-xs text-[#b0578d] font-medium flex justify-between items-center gap-2 hover:bg-[#b3809e] hover:text-white'>
                                <BiStopCircle className='text-xl' />
                                STOP COUNTING
                            </button>
                        )}    
                    </div>              
                </div>

                <div className='bg-slate-300 w-full md:w-[50vw] h-fit max-h-[60vh] mx-auto'>
                    <video src='/assets/videos/downloaded-video-5.mp4' controls autoPlay muted className='w-full'></video>
                </div>
            </div> 
        </div>
    )
}

export default ShowCount