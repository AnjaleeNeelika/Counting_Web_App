import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginSuccessPopup from '../components/LoginSuccessPopup';

const Signup = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errorMsg, setErrorMsg] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    console.log(values);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMsg({
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        });

        let hasError = false;

        if(values.name === '') {
            setErrorMsg(prevState => ({...prevState, name: "Please enter your full name"}));
            hasError = true;
        }
        if(values.email === '') {
            setErrorMsg(prevState => ({...prevState, email: "Please enter your email"}));
            hasError = true;
        }
        if(values.password === '') {
            setErrorMsg(prevState => ({...prevState, password: "Please enter the password"}));
            hasError = true;
        }
        if(values.confirm_password === '') {
            setErrorMsg(prevState => ({...prevState, confirm_password: "Please re-enter the password"}));
            hasError = true;
        }

        if(values.password !== '' && values.confirm_password !== '' && values.password !== values.confirm_password) {
            setErrorMsg(prevState => ({...prevState, confirm_password: "Passwords don't match. Try again."}));
            hasError = true;
        }
        
        if (!hasError) {
            const requestData = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
        
            try {
                const response = await axios.post('http://localhost:5000/signup', requestData);
                console.log(response.data);
    
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                });
    
                setPopup(true);
                navigate('/signup');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMsg({ ...errorMsg, email: error.response.data.error });
                }
                console.error('Signup error:', error);
            }
        }
        
    }

    // useEffect(() => {
    //     if(errorMsg.name === '' && errorMsg.email === '' && errorMsg.password === '' && errorMsg.confirm_password === '') {
    //         console.log('Success');
    //         setValues({
    //             name: '',
    //             email: '',
    //             password: '',
    //             confirm_password: '',
    //         });
    //         navigate('/signup');
    //     }
    // }, [errorMsg]);

    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            {popup ? <LoginSuccessPopup /> : <></>}
            <div className='bg-white max-w-[400px] w-full rounded-md shadow-md p-10'>
                <h2 className='text-[#a87c7c] w-fit mx-auto text-center'>Create An Account</h2>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-5'>
                            <InputText name='name' label='Name' value={values.name} onChange={onChange} errorMsg={errorMsg.name} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='email' label='Email' value={values.email} onChange={onChange}  errorMsg={errorMsg.email} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='password' type='password' label='Password' value={values.password} onChange={onChange} errorMsg={errorMsg.password} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='confirm_password' type='password' label='Confirm Password' value={values.confirm_password} onChange={onChange} errorMsg={errorMsg.confirm_password} />
                        </div>
                        <div className='w-full mt-10 flex justify-center items-center'>
                            <button onClick={handleSubmit} className='w-fit bg-[#503c3c] px-5 py-2 text-white rounded-md shadow-md text-sm hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Sign Up</button>
                        </div>
                    </form>
                    <div className='flex flex-wrap justify-center items-center gap-2 text-sm mt-5'>
                        Already have an account?
                        <Link to={{pathname: '/login'}} className='text-blue-700 hover:text-500 hover:border-b hover:border-blue-500'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup