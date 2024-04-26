import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { data } from 'autoprefixer';
import LoadingPopup from '../components/LoadingPopup';

const BASE_URL = 'http://localhost:5000';

const Login = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    console.log(values);

    const [errorMsg, setErrorMsg] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setErrorMsg({
            email: '',
            password: '',
        });

        let hasError = false;

        if(values.email === '') {
            setErrorMsg(prevState => ({...prevState, email: 'Please enter the username'}));
            hasError = true;
        } 

        if(values.password === '') {
            setErrorMsg(prevState => ({...prevState, password: 'Please enter the password'}))
            hasError = true;
        }

        if (!hasError) {
            const requestData = {
                email: values.email,
                password: values.password,
            };

            try {
                const response = await axios.post('http://localhost:5000/login', requestData);
                console.log(response.data);

                setValues({
                    email: '',
                    password: '',
                });

                sessionStorage.setItem('token', response.data.access_token);
                // console.log(sessionStorage.getItem('token'));

                navigate('/home');
            } catch (error) {
                if(error.response && error.response.data.error === 'User not found') {
                    setErrorMsg(prevState => ({...prevState, email: 'User not found'}));
                }
                if(error.response && error.response.data.error === 'Incorrect password') {
                    setErrorMsg(prevState => ({...prevState, password: 'Incorrect password'}));
                }
                console.error('Login error: ', error);
            }
            setLoading(false);
        }
         

        // try {
        //     axios.post(`${BASE_URL}/login`, {
        //         email: values['username'],
        //         password: values['password'],
        //     });
        //     // sessionStorage.setItem("token", data.access_token);
        //     console.log('Success');
        //     navigate('/login');
        // } catch (error) {
        //     console.error('Error login in', error);
        // }
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
            {loading ? (
                <LoadingPopup message='Logging In...' />
            ) : (
                <></>
            )}
            <div className='bg-white max-w-[400px] w-full p-10 rounded-md shadow-md'>
                <h1 className='w-fit text-[#a87c7c] mx-auto'>Welcome Back!</h1>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-4'>
                            <InputText name='email' label='Username' value={values['email']} onChange={onChange} errorMsg={errorMsg['email']} />
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
