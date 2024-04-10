
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const BASE_URL = 'http://localhost:5000';

// Define checkCodec function outside of the component
const checkCodec = (videoSrc) => {
    const video = document.createElement('video');

    video.oncanplay = () => {
        console.log('Codec supported');
    };

    video.onerror = () => {
        console.error('Codec not supported');
    };

    video.src = videoSrc;
};

const NumberOfActions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [videoId, setVideoId] = useState('');
    const [numberOfSteps, setNumberOfSteps] = useState('');

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const id = location.pathname.split('/').pop();
                const response = await axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`);
                const { filePath } = response.data;
                const parts = filePath.split('/');
                const name = parts.pop();
                setFileName(name);
                setVideoId(id);

                // Call checkCodec function after setting fileName
                checkCodec(`/videos/fulldetect_videos/${name}`);
            } catch (error) {
                console.error('Error loading video:', error);
            }
        };

        fetchVideoDetails();
    }, [location.pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/number_of_action`, {
                _id: videoId,
                number_of_steps: numberOfSteps
            });
            console.log("Request sent successfully!");
            navigate(`/video-input-type/no-of-actions/input-points/${videoId}/${numberOfSteps}`);
        } catch (error) {
            console.error('Error posting number of actions:', error);
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
    );
};

export default NumberOfActions;





// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';

// const NumberOfActions = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [fileName, setFileName] = useState('');
//     const [videoId, setVideoId] = useState('');
//     const [numberOfSteps, setNumberOfSteps] = useState('');
//     const [currentFrame, setCurrentFrame] = useState('');

//     useEffect(() => {
//         const fetchVideoDetails = async () => {
//             try {
//                 const id = location.pathname.split('/').pop();
//                 const response = await axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`);
//                 const { filePath } = response.data;
//                 console.log('Response Data:', response.data);
//                 const parts = filePath.split('/');
//                 const name = parts.pop();
//                 setFileName(name);
//                 setVideoId(id);

//                 // Start listening to SSE
//                 const eventSource = new EventSource(`${BASE_URL}/videos/view-fulldetect/${id}`);
//                 eventSource.onmessage = function (event) {
//                     const responseData = JSON.parse(event.data);
//                     if (responseData.currentFrame !== undefined) {
//                         setCurrentFrame(responseData.currentFrame);
//                     }
//                 };

//                 // Cleanup
//                 return () => {
//                     eventSource.close();
//                 };
//             } catch (error) {
//                 console.error('Error loading video:', error);
//             }
//         };

//         fetchVideoDetails();
//     }, [location.pathname]);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${BASE_URL}/number_of_action`, {
//                 _id: videoId,
//                 number_of_steps: numberOfSteps
//             });
//             console.log("Request sent successfully!");
//             navigate(`/video-input-type/no-of-actions/input-points/${videoId}/${numberOfSteps}`);
//         } catch (error) {
//             console.error('Error posting number of actions:', error);
//         }
//     };

//     return (
//         <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
//             <div className=''>
//                 <form onSubmit={handleSubmit} className='bg-slate-50 text-center w-fit h-fit px-3 md:px-6 py-5 mx-auto rounded-md shadow-md'>
//                     <h2 className='mx-auto text-center w-fit text-[#8a5374]'>Count the Number of Steps Per One Action</h2>
//                     <div className='w-fit mx-auto flex flex-wrap justify-center items-center mt-3 mb-8'>
//                         <span className='text-sm mr-0 md:mr-5 mb-2 md:mb-0'>Enter the number of steps</span>
//                         <input
//                             type="text"
//                             name="numberOfSteps"
//                             id="numberOfSteps"
//                             value={numberOfSteps}
//                             onChange={(e) => setNumberOfSteps(e.target.value)}
//                             className='text-sm border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded'
//                         />
//                     </div>
//                     <button type="submit" className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer'>Enter</button>
//                 </form>

//                 <div id="frameCount">{currentFrame !== '' && <p>Current Frame: {currentFrame}</p>}</div>
//                 <div className='bg-slate-300 lg:w-[900px] w-full max-h-[500px] h-fit mx-auto mt-5 shadow-md'>
//                     {fileName && (
//                         <video className="w-full" autoPlay loop controls muted>
//                             <source src={`/videos/fulldetect_videos/${fileName}`} type="video/mp4" />
//                         </video>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NumberOfActions;
