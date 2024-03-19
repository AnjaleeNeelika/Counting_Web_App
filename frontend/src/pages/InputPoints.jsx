import { React, useEffect, useState } from 'react';
import PoseLandmarks from '../assets/images/pose_landmarks_index.png';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const InputPoints = () => {
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const id = parts[parts.length - 1];

        axios.get(`${BASE_URL}/videos/view-fulldetect/${id}`)
            .then(response => {
                const filePath = response.data.filePath;
                console.log("filepathhhh" + filePath)
                const parts = filePath.split('/'); // Split by backslash
                const fileName = parts.pop(); // Get the last part (the file name)

                console.log(fileName)
                console.log(filePath)

                setFileName(fileName); // Update fileName state
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
                            0 - left shoulder<br />
                            1 - right shoulder<br />
                            2 - left elbow<br />
                            3 - right elbow<br />
                            4 - left wrist<br />
                            5 - right wrist<br />
                        </div>
                        <div className='w-fit'>
                            6 - left hip<br />
                            7 - right hip<br />
                            8 - left knee<br />
                            9 - right knee<br />
                            10 - left ankle<br />
                            11 - right ankle<br />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center p-10'>
                <div>
                    <div className='flex gap-5 w-fit mx-auto bg-[#a57d97ce] text-white mb-5 py-3 px-5 rounded shadow'>
                        <h3>No. of Actions: 3</h3>
                    </div>
                    <div className='bg-white p-5 md:px-14 md:py-5 rounded-md shadow-md max-h-full h-fit overflow-auto flex flex-wrap justify-between items-center md:gap-20'>
                        <div className='py-3'>
                            <h4>Action 1</h4>
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
                        <div className='py-3'>
                            <h4>Action 2</h4>
                            <div className='w-full text-sm mt-2'>
                                <div className='w-full flex justify-between items-center gap-2 md:gap-5 mb-3'>
                                    <label htmlFor="">Mid Point</label>
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
                        <div className='py-3'>
                            <h4>Action 3</h4>
                            <div className='w-full text-sm mt-2'>
                                <div className='w-full flex justify-between items-center gap-2 md:gap-5 mb-3'>
                                    <label htmlFor="">Mid Point</label>
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
                    </div>
                    <div className='mt-5'>
                        <Link to={{ pathname: '/video-input-type/angles' }}>
                            <Button1>Save</Button1>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InputPoints