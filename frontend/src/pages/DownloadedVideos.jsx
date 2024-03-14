import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';
import PlayVideo from '../components/PlayVideo';


const videos = [
    // {
    //     id: 1,
    //     name: 'downloaded-video-1.mp4',
    //     date: '2024/03/01',
    //     duration: '20 sec',
    //     videoPath: '/assets/videos/downloaded-video-1.mp4'
    // },
    // {
    //     id: 2,
    //     name: 'downloaded-video-2.mp4',
    //     date: '2024/03/01',
    //     duration: '20 sec',
    //     videoPath: '/assets/videos/downloaded-video-2.mp4'
    // },
    // {
    //     id: 3,
    //     name: 'downloaded-video-3.mp4',
    //     date: '2024/03/01',
    //     duration: '20 sec',
    //     videoPath: '/assets/videos/downloaded-video-3.mp4'
    // },
    {
        id: 4,
        name: 'downloaded-video-4.mp4',
        date: '2024/03/12',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-4.mp4'
    },
    {
        id: 7,
        name: 'downloaded-video-4.mp4',
        date: '2024/03/12',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-5.mp4'
    },
    // {
    //     id: 5,
    //     name: 'downloaded-video-2.mp4',
    //     date: '2024/03/01',
    //     duration: '20 sec',
    //     videoPath: '/assets/videos/downloaded-video-2.mp4'
    // },
    // {
    //     id: 6,
    //     name: 'downloaded-video-3.mp4',
    //     date: '2024/03/01',
    //     duration: '20 sec',
    //     videoPath: '/assets/videos/downloaded-video-3.mp4'
    // },
];

const DownloadedVideos = () => {
    const [videoList, setVideoList] = useState(videos);
    const [hovered, setHovered] = useState(null);
    const [popupVideo, setPopupVideo] = useState(null);

    const handlePlayClick = (videoPath) => {
        setPopupVideo(videoPath);
    }

    const handleClosePopup = () => {
        setPopupVideo(null);
    }

    return (
        <div className='w-full h-full overflow-auto p-5 md:p-10 flex flex-wrap justify-center'>
            <div className='w-full max-w-[700px]'>
                <h1>Downloaded Videos</h1>
                <div className='w-full mt-10 overflow-auto'>
                    {videoList && videoList.map((video) => (
                        <div 
                            key={video.id} 
                            id={video.id} 
                            className='w-full bg-white p-5 rounded-md shadow-md flex justify-between items-center gap-10 mb-5'
                        >                            
                            <div 
                                className='relative h-32 w-[350px] bg-slate-100 shadow'
                                onMouseEnter={() => setHovered(video.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                
                                {/* <div className='relative w-full h-full bg-black opacity-30'></div>
                                <video src={video.videoPath} className='w-full h-full object-cover' controls /> */}
                                {/* <div className={`absolute top-0 left-0 bg-slate-600 w-full h-full z-10 ${hovered === video ? 'block' : 'hidden'}`}>
                                    <video src={video.videoPath} className='h-3/4' controls />
                                </div> */}
                                <video src={video.videoPath} className='w-full h-full object-cover' />
                                
                                {hovered === video.id && (
                                    <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                                        <button onClick={() => handlePlayClick(video.videoPath)} className='text-4xl rounded-full text-[#dadada]'>
                                            <AiFillPlayCircle />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='w-fit md:w-full h-full flex flex-wrap justify-between items-center gap-10'>
                                <div className='w-fit mx-auto'>
                                    <div className='mb-1'>{video.name}</div>
                                    <div className='mb-1'>
                                        {video.date}
                                    </div>
                                    <div><span className='font-semibold mr-2'>Duration:</span>{video.duration}</div>
                                </div>
                                <Link 
                                    to={{
                                        pathname: '/video-input-type/no-of-actions',
                                        search: `?videoPath=${encodeURIComponent(video.videoPath)}`
                                    }}
                                    className='w-fit mx-auto'
                                >
                                    <button className='bg-[#85627b] text-sm text-white py-2 px-4 rounded-md shadow-md hover:bg-[#9c7391] transition hover:-translate-y-0.5 duration-300'>
                                        Use for Counting
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {popupVideo && <PlayVideo videoPath={popupVideo} onClose={handleClosePopup} />}
        </div>
    )
}

export default DownloadedVideos

