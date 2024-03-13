import React from 'react';
import VideoUploader from '../components/VideoUploader';
import Button1 from '../components/Button1';
import { Link, useLocation } from 'react-router-dom';

const UploadVideo = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    return (
        <div className='w-full h-full overflow-auto p-10'>
                <h1>Upload Your Video</h1>
                <div className='w-full h-[calc(100%-3rem)] flex justify-center items-center'>
                    <div className='w-full md:w-fit mx-auto bg-white p-5 rounded-lg shadow-lg'>
                        <VideoUploader />
                        <div className='mt-5'>
                            <Link 
                                to={{
                                    pathname: '/video-input-type/no-of-actions'
                                }}
                            >
                                <Button1>Upload Video</Button1>
                            </Link>
                        </div>
                        
                    </div>
                </div>           
        </div>
    )
}

export default UploadVideo