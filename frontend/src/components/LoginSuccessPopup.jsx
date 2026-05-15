import React from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
// import { useSpring } from 'react-spring';

const LoginSuccessPopup = () => {
    // const checkmarkerAnimation = useSpring({
    //     from: { opacity: 0, transform: 'scale(0.5)' },
    //     to: { opacity: 1, transform: 'scale(1)' },
    //     consfig:{ tension: 300, friction: 10 }
    // });

    return (
        <div className='fixed left-0 h-[91%] w-full bg-black bg-opacity-50 flex justify-center items-center p-5 md:p-0 z-10 backdrop-blur-md'>
            <div className='w-fit h-fit py-5 px-10 bg-white rounded-md shadow-md'>
                <IoCheckmarkCircleOutline className='text-[#a87c7c] text-6xl mx-auto' />

                <p className='text-lg mt-5 text-[#503c3c] font-medium'>Account created successfully</p>
                <div className='w-full flex items-center justify-center mt-8 text-sm mb-2'>
                    <Link
                        to={{
                            pathname: '/login'
                        }}
                    >
                        <button className='bg-[#503c3c] px-7 py-1.5 shadow-md rounded-md text-white hover:-translate-y-1 transition-transform duration-300'>Ok</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginSuccessPopup