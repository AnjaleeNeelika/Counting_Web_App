import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button1 from '../components/Button1';

const NumberOfActions = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const videoPath = searchParams.get('videoPath');
    console.log(videoPath);

    return (
        <div className='w-full h-full overflow-auto p-6 md:p-10 flex flex-wrap justify-center items-center gap-10'>
            <div className=''>
                <form className='bg-slate-50 text-center w-fit h-fit px-3 md:px-6 py-5 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto text-center w-fit text-[#8a5374]'>Count the Number of Steps Per One Action</h2>
                    <div className='w-fit mx-auto flex flex-wrap justify-center items-center mt-3 mb-8'>
                        <span className='text-sm mr-0 md:mr-5 mb-2 md:mb-0'>Enter the number of steps</span>
                        <input type="text" name="" id=""  className='text-sm border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded' />
                    </div>
                    <Link to={{ pathname: '/video-input-type/no-of-actions/input-points' }}>
                        <Button1>Enter</Button1>
                    </Link>                    
                </form> 
                <div className='bg-slate-300 lg:w-[900px] w-full max-h-[500px] h-fit mx-auto mt-5 shadow-md'>
                    <video src={videoPath} controls autoPlay loop className='w-full'></video>
                </div>
            </div> 
        </div>
    )
}

export default NumberOfActions