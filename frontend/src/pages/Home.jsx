import React from 'react';
import VideoType from '../assets/images/screenshots/ss_1.jpeg';
import UploadVideo from '../assets/images/screenshots/ss_2.jpg';
import garmentImage from '../assets/images/garment_images/garment_factory_3.jpg';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import SaveTime from '../assets/images/icons/save-time.png';
import Efficiency from '../assets/images/icons/efficiency.png';
import Reports from '../assets/images/icons/reports.png';
import { FiPhone } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';

const Home = () => {
    return (
        <div className=''>
            <div className="bg-cover bg-center h-[75vh]" style={{backgroundImage: `url(${garmentImage})`}}>
                <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-60 p-10'>
                    <div className='mb-10 text-white'>
                        <div className='text-5xl italic font-semibold'>Get the finished product count easily!</div>
                        <div className='mt-5 w-fit mx-auto'>Now you can get the finished product count of a worker by using their body gestures.</div>
                        <div className='w-fit mx-auto'>You don't need to walk around the factory counting the products!</div>
                        <div className='w-fit mx-auto mt-10'>
                            <Link 
                                to={{pathname: '/signup'}}
                            >
                                <button className='w-fit mx-auto border-2 py-3 px-7 rounded-md hover:bg-white hover:text-black'>Signup to Continue</button>
                            </Link>
                        </div>  
                    </div>
                </div>
            </div>
            {/* <div className='p-10 w-full h-fit'>
                <div className='bg-white px-12 py-8 rounded-md shadow-md w-full mx-auto'>
                    <h2 className='mb-5'>How it works:</h2>
                    <div className='flex justify-between items-center mb-10'>
                        <img src={VideoType} className='max-w-[500px] w-full rounded-md shadow-md' />
                    </div>
                    <div className='flex justify-between items-center mb-10'>
                        <img src={UploadVideo} className='max-w-[500px] w-full rounded-md shadow-md' />
                    </div>
                </div>
            </div> */}

            <div className='w-fit px-10 py-14 mx-auto'>
                <div className='text-2xl text-[#7e5472] font-semibold italic'>It Offers,</div>
                <div className='w-full pl-10'>
                    <div className='flex items-center gap-5 mt-3'>
                        <FiCheckCircle className='text-[#7e5472] text-2xl font-medium' />
                        <span className='text-lg text-[#7e5472]'>Real-time counting of products</span>
                    </div>
                    <div className='flex items-center gap-5 mt-3'>
                        <FiCheckCircle className='text-[#7e5472] text-2xl font-medium' />
                        <span className='text-lg text-[#7e5472]'>Customizable activities</span>
                    </div>
                    <div className='flex items-center gap-5 mt-3'>
                        <FiCheckCircle className='text-[#7e5472] text-2xl font-medium' />
                        <span className='text-lg text-[#7e5472]'>Report generation facilities</span>
                    </div>
                    <div className='flex items-center gap-5 mt-3'>
                        <FiCheckCircle className='text-[#7e5472] text-2xl font-medium' />
                        <span className='text-lg text-[#7e5472]'>Step-by-step navigation</span>
                    </div>
                </div>                
            </div>

            <div className='bg-white px-10 py-14 shadow-md'>
                <div className='text-2xl text-[#7e5472] font-semibold italic mb-5'>Benefits</div>
                <div className='w-full flex flex-wrap justify-evenly items-center gap-10'>
                    <div className='w-40 h-40 bg-[#8a6d82] p-5 rounded-lg shadow-lg flex items-center justify-center'>
                        <div className='w-fit h-fit'>
                            <img src={SaveTime} className='mx-auto' />
                            <div className='w-fit text-white font-semibold mt-3 mx-auto'>Save Time</div>
                        </div>
                    </div>    
                    <div className='w-40 h-40 bg-[#8a6d82] p-5 rounded-lg shadow-lg flex items-center justify-center'>
                        <div className='w-fit h-fit'>
                            <img src={Efficiency} className='mx-auto' />
                            <div className='w-fit text-white font-semibold mt-3 mx-auto'>Efficient</div>
                        </div>
                    </div>   
                    <div className='w-40 h-40 bg-[#8a6d82] p-5 rounded-lg shadow-lg flex items-center justify-center'>
                        <div className='w-fit h-fit'>
                            <img src={Reports} className='mx-auto' />
                            <div className='w-fit text-white text-center font-semibold mt-3 mx-auto'>Easy Report Generation</div>
                        </div>
                    </div> 
                </div>                              
            </div>

            <div className='w-full bg-[#22171f] px-10 py-20 flex flex-wrap justify-evenly items-center gap-10'>
                <div className=''>
                    <div className='text-white text-3xl font-semibold'>Contact Us</div>
                    <div className='mt-10 pl-10'>
                        <div className='text-white flex items-center gap-4'>
                            <FiPhone className='text-white text-xl' />
                            <span>+94 71 23 45 678</span>
                        </div>
                        <div className='text-white flex items-center gap-4 mt-5'>
                            <MdMailOutline className='text-white text-xl' />
                            <span>hello@gmail.com</span>
                        </div>
                        <div className='text-white flex items-center gap-4 mt-5'>
                            <TbWorld className='text-white text-xl' />
                            <span>hello@gmail.com</span>
                        </div>
                    </div>
                </div>    
                <div>
                    <div className='text-white text-3xl font-semibold'>Write to Us</div>
                    <div className='mt-5'>
                        <div className='flex gap-6'>
                            <div className='w-fit flex flex-col'>
                                <label htmlFor="first-name" className='text-xs text-white mb-1'>First Name*</label>
                                <input type='text' className='first-name px-3 py-2 text-xs rounded-sm outline-none border-2 hover:border-[#8a6d82]' />
                            </div>
                            <div className='w-fit flex flex-col'>
                                <label htmlFor="last-name" className='text-xs text-white mb-1'>Last Name*</label>
                                <input type='text' className='last-name px-3 py-2 text-xs rounded-sm outline-none border-2 hover:border-[#8a6d82]' />
                            </div>
                        </div>
                        <div className='w-full flex flex-col mt-5'>
                            <label htmlFor="email" className='text-xs text-white mb-1'>Email*</label>
                            <input type='email' className='email px-3 py-2 text-xs rounded-sm outline-none border-2 hover:border-[#8a6d82]' />
                        </div>
                        <div className='w-full flex flex-col mt-5'>
                            <label htmlFor="teaxtarea" className='text-xs text-white mb-1'>Note*</label>
                            <textarea className='textarea min-h-20 h-fit px-3 py-2 text-xs rounded-sm outline-none border-2 hover:border-[#8a6d82]' />
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default Home
