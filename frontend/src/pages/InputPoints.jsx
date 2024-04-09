import { React, useEffect, useState } from 'react';
import PoseLandmarks from '../assets/images/pose_landmarks_index.png';
import Button1 from '../components/Button1';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const InputPoints = () => {
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [no_of_actions, setNoOfActions] = useState(null);
    const [formData, setFormData] = useState([]);

    const navigate = useNavigate();

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

                setFileName(fileName);
                setVideoId(id);
                setNoOfActions(no_of_actions)
            })
            .catch(error => {
                setError(error.message);
                console.error('Error loading video:', error);
            });
    }, []);


    const handleInputChange = (index, field, value) => {
        setFormData(prevData => {
            const newData = [...prevData]; // Create a copy of the previous data array
            if (index >= newData.length) {
                // If the index exceeds the current length, add empty objects up to the index
                for (let i = newData.length; i <= index; i++) {
                    newData.push({ midPoint: '', point1: '', point2: '' });
                }
            }
            newData[index] = { ...newData[index], [field]: value }; // Update the specific field of the object at the given index
            return newData; // Return the updated data array
        });
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        try {
            await axios.post(`${BASE_URL}/input_points`, {
                _id: videoId,
                input_points: formData
            });
            console.log("Request sent successfully!"); // Log success
            navigate(`/video-input-type/angles/${videoId}/${no_of_actions}`);
        } catch (error) {
            console.error('Error posting number of actions:', error);
            // Handle error
        }
    };




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
                    <div className='w-full md:w-fit p-5 md:block flex flex-wrap justify-between'>
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

            <div className='flex flex-wrap justify-center items-center p-10'>
                <div className='w-full'>
                    <div className='flex flex-wrap justify-center items-center text-center gap-5 w-fit mx-auto bg-[#a57d97ce] text-white mb-5 py-3 px-5 rounded shadow'>
                        <h3>No. of Actions: {no_of_actions}</h3>
                    </div>
                    <div className='max-w-full w-fit bg-white p-5 md:px-14 md:py-5 rounded-md shadow-md max-h-full h-fit overflow-auto flex flex-wrap justify-between items-center md:gap-20 mx-auto'>
                        {[...Array(Number(no_of_actions))].map((_, index) => (
                            <div key={index} className='py-3'>
                                <h4>Action {index + 1}</h4>
                                <div className='w-full text-sm mt-2'>
                                    <div className='w-full flex justify-between items-center gap-2 md:gap-5 mb-3'>
                                        <label htmlFor="" className='bg-slate-100'>Mid Point</label>
                                        {/* <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' /> */}
                                        <input
                                            type='text'
                                            className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2'
                                            onChange={(e) => handleInputChange(index, 'midPoint', e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full flex justify-between items-center gap-5 mb-3'>
                                        <label htmlFor="">Point 1</label>
                                        {/* <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' /> */}
                                        <input
                                            type='text'
                                            className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2'
                                            onChange={(e) => handleInputChange(index, 'point1', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex justify-between items-center gap-5 mb-3'>
                                        <label htmlFor="">Point 2</label>
                                        {/* <input type='text' className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2' /> */}
                                        <input
                                            type='text'
                                            className='border-2 border-[#e7e7e7] hover:border-[#d3b0c7] focus:border-[#d3b0c7] outline-none rounded p-2'
                                            onChange={(e) => handleInputChange(index, 'point2', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-5 text-center'>
                        {/* <Link to={`/video-input-type/angles/${videoId}`}>
                            <Button1>Save</Button1>
                        </Link> */}

                        <button onClick={handleSubmit} type="submit" className='w-fit mx-auto bg-[#643843] text-sm text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#75515a] cursor-pointer'>Save</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InputPoints