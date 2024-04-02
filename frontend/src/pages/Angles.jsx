import { React, useEffect, useState } from 'react';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';



const Angles = () => {
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

                const response = await axios.get(`${BASE_URL}/videos/get-angles/${id}`);
                const filePath = response.data.filePath;
                const parts = filePath.split('/');
                const fileName = parts.pop();

                setFileName(fileName);
                console.log('filename:',fileName)
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
            <div className='bg-slate-300 w-full lg:w-[50vw] h-fit max-h-[60vh]'>
                {/* <video src='/assets/videos/downloaded-video-5.mp4' controls autoPlay className='w-full'></video> */}
                {fileName && (
                    <video className="w-full" autoPlay loop controls muted>
                        <source src={`/videos/get_angles_videos/${fileName}`} type="video/mp4" />
                    </video>
                )}
            </div>
            <div className='max-w-[800px] w-full bg-white p-5 md:p-10 rounded-md shadow-md'>
                <div className='mb-3'>
                    <h2 className='mb-4'>Angles</h2>
                    <h3>Enter a threshold value you want</h3>
                </div>

                <div className='w-full overflow-auto'>
                    <table className='text-center w-full'>
                        <thead>
                            <tr className='text-xs font-semibold'>
                                <td className='w-2/12'></td>
                                <td className='w-1/4'>Angle</td>
                                <td className='w-1/4'>Threshold Value</td>
                                <td className='w-1/4'>Angle After Applying Threshold Value</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-left'>
                                    <h3 className='text-[#b0578d] text-sm md:text-base font-medium'>Action 1</h3>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                                <td className='flex my-1'>
                                    <input type="number" max={100} min={1} name="" id="" className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                    <button className='bg-[#b0578d] text-white text-xs px-2 ml-2 rounded-full hover:bg-[#974b79]'>Apply</button>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                            </tr>
                            <tr>
                                <td className='text-left'>
                                    <h3 className='text-[#b0578d] text-sm md:text-base font-medium'>Action 2</h3>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                                <td className='flex my-1'>
                                    <input type="number" max={100} min={1} name="" id="" className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                    <button className='bg-[#b0578d] text-white text-xs px-2 ml-2 rounded-full hover:bg-[#974b79]'>Apply</button>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                            </tr>
                            <tr>
                                <td className='text-left'>
                                    <h3 className='text-[#b0578d] text-sm md:text-base font-medium'>Action 3</h3>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                                <td className='flex my-1'>
                                    <input type="number" max={100} min={1} name="" id="" className='border w-20 md:w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                    <button className='bg-[#b0578d] text-white text-xs px-2 ml-2 rounded-full hover:bg-[#974b79] hover:-translate-y-0.5'>Apply</button>
                                </td>
                                <td>
                                    <input type="text" name="" id="" disabled className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                

                <div className='mb-3 mt-10'>
                    <h3>Enter the starting and ending angles of an action to get a count</h3>
                </div>
                <table className='text-center w-full'>
                    <thead>
                        <tr className='text-xs font-semibold'>
                            <td className='w-2/12'></td>
                            <td className='w-1/3'>Starting Angle</td>
                            <td className='w-1/3'>Ending Angle</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <h3 className='text-[#b0578d] text-base font-medium'>Action 1</h3>
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 className='text-[#b0578d] text-base font-medium'>Action 2</h3>
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 className='text-[#b0578d] text-base font-medium'>Action 3</h3>
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                            <td>
                                <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='mt-8'>
                    <Link to={{ pathname: '/video-input-type/show-count' }}>
                        <Button1>Continue</Button1>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Angles