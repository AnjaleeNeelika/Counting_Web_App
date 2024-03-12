import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const VideoInputType = () => {
    const [selectedOptions, setSelectedOptions] = useState('');
    const [path, setPath] = useState('');
    const location = useLocation();
    const currentLocation = location.pathname;

    useEffect(() => {
        if(selectedOptions === 'Live') {
            setPath(`${currentLocation}/live-video`)
        } else if(selectedOptions === 'Upload') {
            setPath(`${currentLocation}/upload-video`)
        }
    }, [selectedOptions]);

    const handleOptionChange = (e) => {
        setSelectedOptions(e.target.value);
        console.log("Selected Option:", selectedOptions);
    }

    const handleSubmit = () => {
        console.log("Selected Option:", selectedOptions);
        console.log("Path: ", path)
    }

    return (
        <div className='w-full h-full overflow-auto flex justify-center items-center'>
            <form method='' className='bg-[#fff] min-w-[300px] w-fit h-fit shadow-lg p-10 rounded-md flex justify-center items-center text-center'>
                <div>
                    <div className='w-full text-center text-2xl font-semibold mx-auto'>
                        Select Video Input Type
                    </div>
                    <div className='w-full px-5 mx-auto mt-8 mb-10 flex justify-between items-center gap-10'>
                        <div className="w-[200px] text-center flex items-center justify-center border-[2px] border-[#a87499] bg-[#8f6482c0] py-5 px-5 rounded-md shadow-md hover:bg-[#c089b0c0]">
                            <input
                                id="live"
                                type="radio"
                                value="Live"
                                name="default-radio"
                                className="w-4 h-4 text-[#e7cbcb] bg-[#e7cbcb] border-[#e7cbcb] focus:ring-[#e7cbcb] dark:focus:ring-[#e7cbcb] cursor-pointer"
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor="default-radio-1"
                                className="ms-3 font-medium text-white"
                            >
                                Live Video
                            </label>
                        </div>
                        <div className="w-[200px] text-center flex items-center justify-center border-[2px] border-[#a87499] bg-[#8f6482c0] py-5 px-5 rounded-md shadow-md hover:bg-[#c089b0c0]">
                            <input
                                id="upload"
                                type="radio"
                                value="Upload"
                                name="default-radio"
                                className="w-4 h-4 text-[#e7cbcb] bg-[#e7cbcb] border-[#e7cbcb] focus:ring-[#e7cbcb] dark:focus:ring-[#e7cbcb] cursor-pointer"
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor="default-radio-2"
                                className="ms-3 font-medium text-white"
                            >
                                Upload Video
                            </label>
                        </div>
                    </div>
                    <Link
                        to={{
                            pathname: path
                        }}
                    >
                        <button className='w-fit bg-[#643843] shadow-lg rounded-md px-5 py-2 text-white text-sm hover:bg-[#8a5f6a]' onClick={handleSubmit}>Continue</button>
                    </Link>
                    
                </div>
            </form>
        </div>
    )
}

export default VideoInputType