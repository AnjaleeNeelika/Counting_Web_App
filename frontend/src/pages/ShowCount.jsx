import React, { useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BiListCheck, BiStopCircle,  } from 'react-icons/bi';
import ReportModal from '../components/ReportModal';

const ShowCount = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handlePause = (() => {
        setIsPaused(!isPaused);
    }); 

    const handleStop = (() => {
        setIsStopped(true);
    });

    return (
        <div className='w-full h-full overflow-auto p-14 flex flex-wrap justify-center items-center gap-10'>
            {showPopup && <ReportModal onClose={() => setShowPopup(false)} />}
            <div className='w-fit'>
                <div className='w-full bg-white p-5 shadow-md mb-10 rounded-md'>
                    <div className='w-full flex flex-wrap justify-center items-center gap-10 mb-10'>
                        <div className='w-56 p-7 bg-[#866078] rounded-md shadow text-white text-5xl text-center'>
                            <h3 className='mb-3'>Time (In Seconds)</h3>
                            100
                        </div>
                        <div className='w-56 p-7 bg-[#866078] rounded-md shadow text-white text-5xl text-center'>
                            <h3 className='mb-3'>Finished Count</h3>
                            100
                        </div>
                    </div>
                        
                    <div className='w-full flex flex-wrap justify-evenly items-center gap-5'>
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

                <div className='bg-slate-300 w-[50vw] h-[60vh]'>
                    
                </div>
            </div> 
        </div>
    )
}

export default ShowCount