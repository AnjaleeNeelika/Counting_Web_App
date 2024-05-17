import React from 'react';
import VideoType from '../assets/images/screenshots/ss_1.jpeg';
import UploadVideo from '../assets/images/screenshots/ss_2.jpg';
import garmentImage from '../assets/images/garment_images/garment_factory_3.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className=''>
            <div className="bg-cover bg-center h-[70vh]" style={{backgroundImage: `url(${garmentImage})`}}>
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
            <div className='p-10 w-full h-fit'>
                <div className='bg-white px-12 py-8 rounded-md shadow-md w-full mx-auto'>
                    <h2 className='mb-5'>How it works:</h2>
                    <div className='flex justify-between items-center mb-10'>
                        <img src={VideoType} className='max-w-[500px] w-full rounded-md shadow-md' />
                    </div>
                    <div className='flex justify-between items-center mb-10'>
                        <img src={UploadVideo} className='max-w-[500px] w-full rounded-md shadow-md' />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home