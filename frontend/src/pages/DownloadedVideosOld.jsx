import React, { useState, useEffect } from 'react';
import Image from '../assets/images/sewing-image-1.jpg';
import { Link } from 'react-router-dom';
import DropdownFilter from '../components/DropdownFilter';

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
    }
];

const [downloadedVideoList, updateDownloadedVideoList] = useState(videos);

const onFilterValueSelected = (filterValue) => {
    console.log(filterValue);
}



// const [popupVideo, setPopupVideo] = useState(null);

const DownloadedVideos = () => {
    
    
    return (
        <div className='w-full h-full overflow-auto p-14 flex flex-wrap justify-center items-center gap-10'>
            <div className='w-[700px] h-full w-max-[700px]'>
                <h1>Downloaded Videos</h1>

                <div className='w-fit mx-auto my-10 flex gap-10 items-center'>
                    <DropdownFilter filterValueSelected={onFilterValueSelected} />
                    {/* <input type="text" name="" id="" className='border p-2 text-xs text-[#464646] outline-none rounded-sm shadow' /> */}
                </div>

                {/* <div className='w-full mt-5'>
                    {downloadedVideoList && downloadedVideoList.map((video) => 
                        (
                            <div 
                                key={video.id} 
                                id={video.id} 
                                className='w-full h-fit bg-white p-5 mb-5 shadow-md rounded-md flex flex-wrap items-center gap-10'
                                
                            >

                                <div>{video.name}</div>
                                <div className='bg-slate-300 w-48 h-32 shadow'>
                                    <video src={video.videoPath} className='w-full h-full object-cover' controls={false} onMouseEnter={(e) => e.target.controls = true} onMouseLeave={(e) => e.target.controls = false}></video>
                                </div>

                                <div className='flex flex-wrap justify-between items-center gap-10'>
                                    <div>
                                        <div className='mb-2'>{video.name}</div>
                                        <div className='mb-2'>{video.date}</div>
                                        <div>
                                            <span className='font-semibold mr-2'>Duration:</span>
                                            {video.duration}
                                        </div>
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
                        ))
                    }
                    
                </div> */}
            </div>
        </div>
        
    )
}

export default DownloadedVideos