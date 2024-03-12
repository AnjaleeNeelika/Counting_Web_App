import React, { useState } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import { Link } from 'react-router-dom';


const videos = [
    {
        id: 1,
        name: 'downloaded-video-1.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-1.mp4'
    },
    {
        id: 2,
        name: 'downloaded-video-2.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-2.mp4'
    },
    {
        id: 3,
        name: 'downloaded-video-3.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-3.mp4'
    },
    {
        id: 4,
        name: 'downloaded-video-1.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-1.mp4'
    },
    {
        id: 5,
        name: 'downloaded-video-2.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-2.mp4'
    },
    {
        id: 6,
        name: 'downloaded-video-3.mp4',
        date: '2024/03/01',
        duration: '20 sec',
        videoPath: '/assets/videos/downloaded-video-3.mp4'
    }
];

const DownloadedVideos = () => {
    const [videoList, setVideoList] = useState(videos);
    const [hovered, setHovered] = useState(null);

    return (
        <div className='w-full h-full overflow-auto p-14 flex flex-wrap justify-center items-center gap-10'>
            <div className='w-[700px] w-max-[700px]'>
                <h1>Downloaded Videos</h1>
                <div className='w-full mt-10 overflow-auto'>
                    {videoList && videoList.map((video) => (
                        <div 
                            key={video.id} 
                            id={video.id} 
                            className='w-full bg-white p-5 rounded-md shadow-md flex justify-between items-center gap-10 mb-5'
                        >
                            <div 
                                className='h-32 w-80 bg-slate-100 shadow'
                                onMouseEnter={() => setHovered(video)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* <div className='relative w-full h-full bg-black opacity-30'></div>
                                <video src={video.videoPath} className='w-full h-full object-cover' controls /> */}
                                {/* <div className={`absolute top-0 left-0 bg-slate-600 w-full h-full z-10 ${hovered === video ? 'block' : 'hidden'}`}>
                                    <video src={video.videoPath} className='h-3/4' controls />
                                </div> */}
                                <video src={video.videoPath} className='w-full h-full object-cover' controls />
                            </div>
                            <div className='w-full h-full flex flex-wrap justify-between items-center gap-10'>
                                <div>
                                    <div className='mb-1'>{video.name}</div>
                                    <div className='mb-1'>
                                        {video.date}
                                    </div>
                                    <div><span className='font-semibold mr-2'>Duration:</span>{video.duration}</div>
                                </div>
                                    <Link to={{
                                        pathname: '/video-input-type/no-of-actions'
                                    }}>
                                        <button className='bg-[#85627b] text-sm text-white py-2 px-4 rounded-md shadow-md hover:bg-[#9c7391] transition hover:-translate-y-0.5 duration-300'>
                                            Use for Counting
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DownloadedVideos