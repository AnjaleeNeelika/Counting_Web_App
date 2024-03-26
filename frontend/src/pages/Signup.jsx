import React, { useState } from 'react';
import InputText from '../components/InputText';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    console.log(values);

    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full rounded-md shadow-md p-10'>
                <h2 className='text-[#a87c7c] w-fit mx-auto'>Create An Account</h2>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-5'>
                            <InputText name='name' label='Name' value={values['name']} onChange={onChange} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='email' label='Email' value={values['email']} onChange={onChange} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='password' type='password' label='Password' value={values['password']} onChange={onChange} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='confirm_password' type='password' label='Confirm Password' value={values['confirm-password']} onChange={onChange} />
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