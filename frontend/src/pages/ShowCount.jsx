import React, { useEffect, useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BiListCheck, BiStopCircle, } from 'react-icons/bi';
import ReportModal from '../components/ReportModal';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const ShowCount = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchVideoDetails = async () => {
            setLoading(true);
            console.log("start");
            try {
                const currentURL = window.location.href;
                const cparts = currentURL.split('/');
                const id = cparts[cparts.length - 1];

                const response = await axios.get(`${BASE_URL}/videos/display-count/${id}`);
                const filePath = response.data.filePath;
                const parts = filePath.split('/');
                const fileName = parts.pop();

                setFileName(fileName);
                console.log('filename:', fileName)
                setVideoSrc(filePath);
                setVideoId(id);
            } catch (error) {
                setError(error.message);
                console.error('Error loading video:', error);
            } finally {
                setLoading(false);
                console.log("Loading state set to false");
            }
        };

        fetchVideoDetails();
    }, []);

    const handlePause = (() => {
        setIsPaused(!isPaused);
    });

    const handleStop = (() => {
        setIsStopped(true);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

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
                    {/* <video src='/assets/videos/sample-vid-14.mp4' controls autoPlay muted className='w-full'></video> */}

                    {loading && <p className='text-center text-[#8a5374] mt-4'>Encoding video, please wait..</p>}
                    {fileName && (
                        <video className="w-full" autoPlay loop controls muted>
                            <source src={`/videos/counting/${fileName}`} type="video/mp4" />
                        </video>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowCount