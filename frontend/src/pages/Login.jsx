import React from 'react';
import InputText from '../components/InputText';
import { Link } from 'react-router-dom';
import { BiSolidUser, BiSolidLock } from 'react-icons/bi';

const Login = () => {
    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-md p-10 w-fit h-fit'>
                <h1 className='text-[#a87c7c] mx-auto w-fit'>Welcome Back!</h1>
                <form className='w-fit'>
                    <div className='my-5 flex justify-between items-center gap-3'>
                        <BiSolidUser className='text-[28px] text-[#a87c7c]' />
                        <InputText label='Username' />
                    </div>
                    <div className='flex justify-between items-center gap-3'>
                        <BiSolidLock className='text-[30px] text-[#a87c7c]' />
                        <InputText label='Password' />
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <button className='w-fit bg-[#503c3c] text-white px-5 py-2 mt-6 mx-auto rounded-md shadow-md hover:bg-[#6d5353] hover:-translate-y-1 transform duration-300'>Login</button>
                    </div>     
                    <div className='mt-3 flex items-center justify-center gap-2 text-sm text-[#999999]'>
                        Don't have an account?
                        <Link 
                            className='text-blue-500'
                            to={{
                                pathname: '/signup'
                            }}
                        >
                            Sign Up
                        </Link>
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default Login