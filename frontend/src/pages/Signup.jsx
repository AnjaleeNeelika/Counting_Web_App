import React from 'react';
import InputText from '../components/InputText';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full rounded-md shadow-md p-10'>
                <h2 className='text-[#a87c7c] w-fit mx-auto'>Create An Account</h2>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-5'>
                            <InputText label='Name' />
                        </div>
                        <div className='mt-5'>
                            <InputText label='Email' />
                        </div>
                        <div className='mt-5'>
                            <InputText label='Password' type='password' />
                        </div>
                        <div className='mt-5'>
                            <InputText label='Confirm Password' type='password' />
                        </div>
                        <div className='w-full mt-10 flex justify-center items-center'>
                            <button className='w-fit bg-[#503c3c] px-5 py-2 text-white rounded-md shadow-md text-sm hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Sign Up</button>
                        </div>
                    </form>
                    <div className='flex justify-center items-center gap-2 text-sm mt-5'>
                        Already have an account?
                        <Link to={{pathname: '/login'}} className='text-blue-700 hover:text-500 hover:border-b hover:border-blue-500'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup