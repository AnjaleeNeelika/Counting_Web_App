import React from 'react';
import InputText from '../components/InputText';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full p-10 rounded-md shadow-md'>
                <h1 className='w-fit text-[#a87c7c] mx-auto'>Welcome Back!</h1>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-4'>
                            <InputText label='Username' />
                        </div>
                        <div className='mt-5'>
                            <InputText label='Password' />
                        </div>
                        <div className='text-right text-blue-700 text-xs mt-1 hover:text-blue-500'>
                            <Link to={{pathname: '/reset-password'}} className='hover:border-b hover:border-blue-500'>Forgot Password?</Link>
                        </div>
                        <div className='flex justify-center items-center mt-8'>
                            <button className='w-fit bg-[#503c3c] text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Login</button>
                        </div>
                    </form>
                    <div className='flex justify-center items-center gap-2 text-sm mt-5'>
                        Don't have an account?
                        <Link to={{pathname: '/signup'}} className='text-blue-700 hover:text-blue-500 hover:border-b hover:border-blue-500'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login