import React from 'react';
import PoseLandmarks from '../assets/images/pose_landmarks_index.png';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';

const InputPoints = () => {
    return (
        <div className='w-full h-full overflow-auto p-10'>
            <h1 className='w-fit mx-auto'>Enter the Point Numbers</h1>
            <div className='flex flex-wrap justify-center items-center gap-10 p-5 '>
                <div className='bg-slate-300 w-[50vw] h-[60vh]'>
                    
                </div>
                <div className='flex justify-between items-center bg-white p-5 rounded-md shadow-md'>
                    <img src={PoseLandmarks} className='w-[20vw]' />
                    <div className='p-5'>
                        11 - left shoulder<br />
                        12 - right shoulder<br />
                        13 - left elbow<br />
                        14 - right elbow<br />
                        15 - left wrist<br />
                        16 - right wrist<br />
                        17 - left pinky<br />
                        18 - right pinky<br />
                        19 - left index<br />
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
            
            <div className='flex justify-center items-center p-10'>
                <div>
                    <div className='flex gap-5 w-fit mx-auto bg-[#a57d97ce] text-white mb-5 py-3 px-5 rounded shadow'>
                        <h3>No. of Actions: 3</h3>
                    </div>
                    <div className='bg-white px-14 py-5 rounded-md shadow-md max-h-full h-fit overflow-auto flex justify-between items-center gap-20'>
                        <div className='py-3'>
                            <h4>Action 1</h4>
                            <div className='w-full text-sm mt-2'>
                                <div className='w-full flex justify-between items-center gap-5 mb-3'>
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
                            <h4>Action 2</h4>
                            <div className='w-full text-sm mt-2'>
                                <div className='w-full flex justify-between items-center gap-5 mb-3'>
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
                                <div className='w-full flex justify-between items-center gap-5 mb-3'>
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