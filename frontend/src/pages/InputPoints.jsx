import { React, useEffect, useState } from 'react';
import PoseLandmarks from '../assets/images/pose_landmarks_index.png';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const InputPoints = () => {
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [no_of_actions, setNoOfActions] = useState(null);

    useEffect(() => {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const id = parts[parts.length - 2];
        const no_of_actions = parts[parts.length - 1];

        axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`)
            .then(response => {
                const filePath = response.data.filePath;
                console.log("filepathhhh" + filePath)
                const parts = filePath.split('/');
                const fileName = parts.pop();

                console.log(fileName)
                console.log(filePath)

                setFileName(fileName); // Update fileName state
                setVideoId(id);
                setNoOfActions(no_of_actions)
            })
            .catch(error => {
                setError(error.message);
                console.error('Error loading video:', error);
            });
    }, []);




    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10'>
            <h1 className='w-full mx-auto text-center'>Enter the Point Numbers</h1>
            <div className='flex flex-wrap w-full h-fit justify-center items-center gap-10 md:p-5'>
                <div className='bg-slate-300 w-full md:w-[50vw] h-fit max-h-[60vh]'>
                    {fileName && (
                        <video className="w-full" autoPlay loop controls muted>
                            <source src={`/videos/fulldetect_videos/${fileName}`} type="video/mp4" />
                        </video>
                    )}
                </div>
                <div className='flex flex-wrap justify-between items-center bg-white p-5 rounded-md shadow-md w-full md:w-fit'>
                    <img src={PoseLandmarks} className='w-full md:w-[20vw]' />
                    <div className='w-full md:w-fit p-5 md:block flex justify-between'>
                        <div className='w-fit'>
                            11 - left shoulder<br />
                            12 - right shoulder<br />
                            13 - left elbow<br />
                            14 - right elbow<br />
                            15 - left wrist<br />
                            16 - right wrist<br />
                            17 - left pinky<br />
                            18 - right pinky<br />
                            19 - left index<br />
                        </div>
                        <div className='w-fit'>
                            20 - right index<br />
                            21 - left thumb<br />
                            22 - right thumb<br />
                            23 - left hip<br />
                            24 - right hip<br />
                            25 - left knee<br />
                            26 - right knee<br />
                            27 - left ankle<br />
                            28 - right ankle<br />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center p-10'>
                <div>
                    <div className='flex gap-5 w-fit mx-auto bg-[#a57d97ce] text-white mb-5 py-3 px-5 rounded shadow'>
                        <h3>No. of Actions: {no_of_actions}</h3>
                    </div>
                    <div className='bg-white p-5 md:px-14 md:py-5 rounded-md shadow-md max-h-full h-fit overflow-auto flex flex-wrap justify-between items-center md:gap-20'>
                        {[...Array(Number(no_of_actions))].map((_, index) => (
                            <div key={index} className='py-3'>
                                <h4>Action {index + 1}</h4>
                                <div className='w-full text-sm mt-2'>
                                    <div className='w-full flex justify-between items-center gap-2 md:gap-5 mb-3'>
                                        <label htmlFor="" className='bg-slate-100'>Mid Point</label>
                                        <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' />
                                    </div>
                                    <div className='w-full flex justify-between items-center gap-5 mb-3'>
                                        <label htmlFor="">Point 1</label>
                                        <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' />
                                    </div>
                                    <div className='flex justify-between items-center gap-5 mb-3'>
                                        <label htmlFor="">Point 2</label>
                                        <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-5'>
                        {/* <Link to={`/video-input-type/angles/${videoId}`}>
                            <Button1>Save</Button1>
                        </Link> */}

                        <button type="submit" className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer'>Save</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InputPoints