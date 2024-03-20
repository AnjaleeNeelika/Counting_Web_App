import { React, useState } from 'react';
import VideoUploader from '../components/VideoUploader';
import Button1 from '../components/Button1';
import { Link, useLocation } from 'react-router-dom';
import EmptyError from '../components/EmptyError';

const UploadVideo = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const [videoId, setVideoId] = useState(null);
    const [uploadError, setUploadError] = useState('');

    const handleUploadSuccess = (uploadedId) => {
        setVideoId(uploadedId);
        console.log("Video ID:", uploadedId);
    };

    const handleUploadClick = () => {
        if(!videoId) {
            setUploadError('Please upload a video before continuing');
        } else {
            setUploadError('');
        }
    }

    return (
        <div className='w-full h-full overflow-auto p-10'>
            <h1>Upload Your Video</h1>
            
            {/* <div className='mt-10'>
                {uploadError &&
                    <EmptyError message={uploadError} />
                } */}

                <div className='w-full h-[calc(100%-3rem)] flex justify-center items-center'>
                    <div className='w-full md:w-fit mx-auto bg-white p-5 rounded-lg shadow-lg'>
                        <VideoUploader onVideoUpload={handleUploadSuccess} />
                        <div className='mt-5'>
                            {/* {videoId ? ( */}
                                <Link
                                    to={`/video-input-type/no-of-actions/${videoId}`}
                                >
                                    <Button1>Upload Video</Button1>
                                </Link>
                            {/* ) : (
                                <Button1 onClick={handleUploadClick}>Upload Video</Button1>
                            )} */}
                        
                        </div>

                    </div>
                </div>
            {/* </div> */}
            
        </div>
    )
}

export default UploadVideo