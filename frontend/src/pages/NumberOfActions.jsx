import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button1 from '../components/Button1';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const NumberOfActions = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const videoPath = searchParams.get('videoPath');
    console.log(videoPath);

    const [videoSrc, setVideoSrc] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const currentURL = window.location.href;
                const cparts = currentURL.split('/');
                const id = cparts[cparts.length - 1];

                const response = await axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`);
                console.log("hiiiiiiiiiiiiiiiiiiiii")
                console.log("")
                const filePath = response.data.filePath;
                const parts = filePath.split('/');
                const fileName = parts.pop();

                setFileName(fileName);
                console.log(fileName)
                setVideoSrc(filePath);
                setVideoId(id);
            } catch (error) {
                setError(error.message);
                console.error('Error loading video:', error);
            }
        };

        fetchVideoDetails();
    }, []);

    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
            <div className=''>
                <form className='bg-slate-50 text-center w-fit h-fit px-3 md:px-6 py-5 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto text-center w-fit text-[#8a5374]'>Count the Number of Steps Per One Action</h2>
                    <div className='w-fit mx-auto flex flex-wrap justify-center items-center mt-3 mb-8'>
                        <span className='text-sm mr-0 md:mr-5 mb-2 md:mb-0'>Enter the number of steps</span>
                        <input type="text" name="" id="" className='text-sm border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded' />
                    </div>
                    <Link to={`/video-input-type/no-of-actions/input-points/${videoId}`}>
                        <Button1>Enter</Button1>
                    </Link>
                </form>
                <div className='bg-slate-300 lg:w-[900px] w-full max-h-[500px] h-fit mx-auto mt-5 shadow-md'>
                    {fileName && (
                        <video className="w-full" autoPlay loop controls muted>
                            <source src={`/videos/fulldetect_videos/${fileName}`} type="video/mp4" />
                        </video>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NumberOfActions