import { React, useState } from 'react';
import VideoUploader from '../components/VideoUploader';
import Button1 from '../components/Button1';
import { Link, useLocation } from 'react-router-dom';
import MessageBox from '../components/MessageBox';

const UploadVideo = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const [videoId, setVideoId] = useState(null);
    const [uploadError, setUploadError] = useState('');
    console.log(videoId)

    const handleUploadSuccess = (uploadedId) => {
        setVideoId(uploadedId);
        console.log("Video ID:", uploadedId);
    };

    const handleUploadClick = () => {
        console.log()
        if (!videoId) {
            setUploadError('Please upload a video before continuing');
            
        } else {
            setUploadError('');
        }
    }

    return (
        <div className='w-full h-full overflow-auto md:p-10 p-5'>
            <h1 className=''>Upload Your Video</h1>
            <div className='w-full h-[calc(100%-3rem)] flex justify-center items-center md:mt-0 mt-5'>
                <div>
                    {uploadError && !videoId &&
                        <div className='mb-10'>
                            <MessageBox type='warning' message={uploadError} />
                        </div>
                    }
                    <div className='w-full md:w-fit mx-auto bg-white p-5 rounded-lg shadow-lg'>
                        <VideoUploader onVideoUpload={handleUploadSuccess} />
                        <form className='mt-5'>
                            {uploadError === '' && videoId ? (
                                <Link
                                    to={`/video-input-type/no-of-actions/${videoId}`}
                                >
                                    <Button1>Upload Video</Button1>
                                </Link>
                            ) : (
                                <Button1 onClick={handleUploadClick}>Upload Video</Button1>
                            )}

                            {/* when the video is not uploaded */}
                            {/* {videoId ? (
                                <Link
                                    to={`/video-input-type/no-of-actions/${videoId}`}
                                >
                                    <Button1>Upload Video</Button1>
                                </Link>
                            ) : (
                                <Button1 onClick={handleUploadClick}>Upload Video</Button1>
                            )} */}

                        </form>
                    </div>
                </div>

            </div>
            {/* </div> */}

        </div>
    )
}

export default UploadVideo
