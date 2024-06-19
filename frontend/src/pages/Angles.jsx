import { React, useEffect, useState } from 'react';
import Button1 from '../components/Button1';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';



const Angles = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [numberOfSteps, setNumberOfSteps] = useState('');
    const [no_of_actions, setNoOfActions] = useState(null);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            setLoading(true);
            try {
                const currentURL = window.location.href;
                const cparts = currentURL.split('/');
                const id = cparts[cparts.length - 2];
                const no_of_actions = cparts[cparts.length - 1]

                const response = await axios.get(`${BASE_URL}/videos/get-angles/${id}`);
                const filePath = response.data.filePath;
                const parts = filePath.split('/');
                const fileName = parts.pop();

                setFileName(fileName);
                console.log('filename:', fileName)
                setVideoSrc(filePath);
                setVideoId(id);
                setNoOfActions(no_of_actions);
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


    const handleInputChange = (index, field, value) => {
        setFormData(prevData => {
            const newData = [...prevData];
            if (index >= newData.length) {
                for (let i = newData.length; i <= index; i++) {
                    newData.push({ start: '', end: '' });
                }
            }
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data", formData);
        try {
            await axios.post(`${BASE_URL}/save_angles_db`, {
                _id: videoId,
                angles: formData
            });
            alert("Angles saved successfully");
            navigate(`/video-input-type/show-count/${videoId}`)
            // navigate(`/websocket`)
        } catch (error) {
            console.error("Error posting angles values", error)
        }
    };




    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
            <div className='bg-slate-300 w-full lg:w-[50vw] h-fit max-h-[60vh]'>
                {/* <video src='/assets/videos/downloaded-video-5.mp4' controls autoPlay className='w-full'></video> */}
                {loading && <p className='text-center text-[#8a5374] mt-4'>Encoding video, please wait..</p>}
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
                            {[...Array(Number(no_of_actions))].map((_, index) => (
                                <tr key={index}>
                                    <td className='text-left'>
                                        <h3 className='text-[#b0578d] text-sm md:text-base font-medium'>Action {index + 1}</h3>
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
                            ))}
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
                        {[...Array(Number(no_of_actions))].map((_, index) => (
                            <tr key={index}>
                                <td>
                                    <h3 className='text-[#b0578d] text-base font-medium'>Action {index + 1}</h3>
                                </td>
                                <td>
                                    {/* <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' /> */}
                                    <input
                                        type='number'
                                        className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]'
                                        onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                                    />
                                </td>
                                <td>
                                    {/* <input type="number" max={180} min={1} name="" id="" className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]' /> */}
                                    <input
                                        type='number'
                                        className='border w-24 px-3 py-2 rounded text-xs hover:border-[#ca95b5] outline-none focus:border-[#b97ca1]'
                                        onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='mt-8'>
                    {/* <Link to={{ pathname: '/video-input-type/show-count' }}>
                        <Button1>Continue</Button1>
                    </Link> */}

                    <button onClick={handleSubmit} type='submit' className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer'>Continue</button>
                </div>

            </div>
        </div>
    )
}

export default Angles



