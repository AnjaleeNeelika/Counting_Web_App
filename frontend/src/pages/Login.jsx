import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { data } from 'autoprefixer';

const BASE_URL = 'http://localhost:5000';

const Login = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    console.log(values);

    const [errorMsg, setErrorMsg] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg({
            username: '',
            password: '',
        });

        if(values.username === '') {
            setErrorMsg(prevState => ({...prevState, username: 'Please enter the username'}))
        } 

        if(values.password === '') {
            setErrorMsg(prevState => ({...prevState, password: 'Please enter the password'}))
        }

        try {
            axios.post(`${BASE_URL}/token`, {
                email: values['username'],
                password: values['password'],
            });
            sessionStorage.setItem("token", data.access_token);
            console.log('Success');
            navigate('/login');
        } catch (error) {
            console.error('Error login in', error);
        }
    }

    // useEffect(() => {
    //     if(errorMsg.username === '' && errorMsg.password === '') {
    //         console.log('Success');
    //         setValues({
    //             username: '',
    //             password: '',
    //         })
    //         navigate('/login');
    //     }
    // }, [errorMsg]);

    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full p-10 rounded-md shadow-md'>
                <h1 className='w-fit text-[#a87c7c] mx-auto'>Welcome Back!</h1>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-4'>
                            <InputText name='username' label='Username' value={values['username']} onChange={onChange} errorMsg={errorMsg['username']} />
                        </div>
                        <div className='mt-5'>
                            <InputText type='password' name='password' label='Password' value={values['password']} onChange={onChange} errorMsg={errorMsg['password']} />
                        </div>
                        <div className='text-right text-blue-700 text-xs mt-1 hover:text-blue-500'>
                            <Link to={{pathname: '/reset-password'}} className='hover:border-b hover:border-blue-500'>Forgot Password?</Link>
                        </div>
                        <div className='flex justify-center items-center mt-8'>
                            <button onClick={handleSubmit} className='w-fit bg-[#503c3c] text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Login</button>
                        </div>
                    </form>
                    <div className='flex flex-wrap justify-center items-center gap-2 text-sm mt-5'>
                        Don't have an account?
                        <Link to={{pathname: '/signup'}} className='text-blue-700 hover:text-blue-500 hover:border-b hover:border-blue-500'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login