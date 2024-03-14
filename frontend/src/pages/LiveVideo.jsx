import React from 'react';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';

const LiveVideo = () => {
    return (
        <div className='w-full h-full overflow-auto p-5 md:p-10 flex flex-wrap justify-center items-center'>
            {/* <div>
                <div className='w-[80vw] h-[65vh] bg-slate-300'>
                
                </div>
                <form className='mt-20 bg-slate-50 w-fit h-fit px-5 py-3 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto w-fit text-[#8a5374]'>Download A Snippet of Video</h2>
                    <div className='w-fit mx-auto flex justify-between items-center gap-10 mt-3'>
                        <span>Select the duration of the video to download</span>
                        <input type="number" name="" id="" min="1" max="20" className='border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded' />
                    </div>
                    <Button1>Download</Button1>
                </form>
            </div> */}

            <div>
                <div className='bg-slate-300 w-full md:w-[50vw] h-fit max-h-[60vh] mx-auto'>
                    <video src='/assets/videos/downloaded-video-5.mp4' controls autoPlay className='w-full'></video>
                </div>
                <form className='mt-10 bg-slate-50 w-fit h-fit px-5 py-5 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto w-fit text-[#8a5374]'>Download A Snippet of Video</h2>
                    <div className='w-fit mx-auto flex justify-between items-center gap-10 my-5'>
                        <span className='text-sm'>Select the duration of the video to download (max. 20min)</span>
                        <input type="number" name="" id="" min="1" max="20" className='border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded' />
                    </div>
                    <Link to={{
                        pathname: '/video-input-type/downloaded-videos'
                    }}>
                        <Button1>Download</Button1>
                    </Link>
                    
                </form>
            </div>
            
        </div>
    )
}

export default LiveVideo