import { React, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button1 from '../components/Button1';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const NumberOfActions = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const videoPath = searchParams.get('videoPath');
    console.log(videoPath);

    const [videoSrc, setVideoSrc] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [numberOfSteps, setNumberOfSteps] = useState('');

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const currentURL = window.location.href;
                const cparts = currentURL.split('/');
                const id = cparts[cparts.length - 1];

                const response = await axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`);
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Number of Steps:", numberOfSteps); // Log the number of steps
        console.log("Video ID:", videoId); // Log the video ID
        try {
            await axios.post(`${BASE_URL}/number_of_action`, {
                _id: videoId,
                number_of_steps: numberOfSteps
            });
            console.log("Request sent successfully!"); // Log success
            navigate(`/video-input-type/no-of-actions/input-points/${videoId}/${numberOfSteps}`);
        } catch (error) {
            console.error('Error posting number of actions:', error);
            // Handle error
        }
    };




    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
            <div className=''>
                <form onSubmit={handleSubmit} className='bg-slate-50 text-center w-fit h-fit px-3 md:px-6 py-5 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto text-center w-fit text-[#8a5374]'>Count the Number of Steps Per One Action</h2>
                    <div className='w-fit mx-auto flex flex-wrap justify-center items-center mt-3 mb-8'>
                        <span className='text-sm mr-0 md:mr-5 mb-2 md:mb-0'>Enter the number of steps</span>
                        <input
                            type="text"
                            name="numberOfSteps"
                            id="numberOfSteps"
                            value={numberOfSteps}
                            onChange={(e) => setNumberOfSteps(e.target.value)}
                            className='text-sm border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded'
                        />
                    </div>
                    <button type="submit" className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer'>Enter</button>
                    {/* <Button1 type="submit">Enter</Button1> */}
                </form>

                <div className='bg-slate-300 lg:w-[900px] w-full max-h-[500px] h-fit mx-auto mt-5 shadow-md'>
                    {fileName ? (
                        <video className="w-full" autoPlay loop controls muted>
                            <source src={`/videos/fulldetect_videos/${fileName}`} type="video/mp4" />
                        </video>
                    ) : (
                        <div className='w-full h-[400px] flex justify-center items-center'>
                            <div className='text-semibold flex justify-between items-center gap-3'>
                                Video unavailable
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NumberOfActions