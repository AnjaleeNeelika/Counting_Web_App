import React from 'react';
import InputText from '../components/InputText';

const ResetPassword = () => {
    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full rounded-md shadow-md p-10'>
                <h1 className='text-[#a87c7c] w-fit mx-auto'>Reset Password</h1>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-5'>
                            <InputText label='New Password' type='password' />
                        </div>
                        <div className='mt-5'>
                            <InputText label='Confirm New Password' type='password' />
                        </div>
                        <div className='mt-10 flex justify-center items-center'>
                            <button className='w-fit bg-[#503c3c] px-5 py-2 text-white rounded-md shadow-md text-sm hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword