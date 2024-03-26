import React from 'react';
import InputText from '../components/InputText';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='bg-white shadow-md p-10 rounded-md w-[400px]'>
                <h1>Sign Up</h1>
                <form action="">
                    <div className='my-5'>
                        <InputText label='Full Name' />
                    </div>
                    <div className='my-5'>
                        <InputText label='Username' />
                    </div>
                    <div className='my-5'>
                        <InputText label='Password' />
                    </div>
                    <div className='my-5'>
                        <InputText label='Confirm Password' />
                    </div>
                    <div className='w-full h-fit flex items-center justify-center mt-10'>
                        <button className='bg-[#5a4242] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#7e5d5d] hover:-translate-y-1 transform duration-300'>Create Account</button>
                    </div>
                    <div className='text-sm flex justify-center items-center gap-1 mt-10 text-[#9b9b9b]'>
                        Already have an account? 
                        <Link to={{ pathname: '/login' }}>
                            <div className='text-blue-500'>Login</div>
                        </Link>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup