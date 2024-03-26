import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        password: '',
        confirm_password: '',
    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    console.log(values);

    const [errorMsg, setErrorMsg] = useState({
        password: '',
        confirm_password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg({
            password: '',
            confirm_password: '',
        });

        if(values.password === '') {
            setErrorMsg(prevState => ({...prevState, password: "Please enter the new password"}));
        }

        if(values.confirm_password === '') {
            setErrorMsg(prevState => ({...prevState, confirm_password: "Please re-enter the new password"}));
        }

        if(values.password !== '' && values.confirm_password !== '' && values.password !== values.confirm_password) {
            setErrorMsg(prevState => ({...prevState, confirm_password: "Passwords don't match. Try again."}));
        }
    }

    useEffect(() => {
        if(errorMsg.password === '' && errorMsg.confirm_password === '') {
            console.log('Success');
            setValues({
                password: '',
                confirm_password: '',
            });

            navigate('/reset-password');
        }
    }, [errorMsg]);

    return (
        <div className='w-full h-full p-10 flex items-center justify-center'>
            <div className='bg-white max-w-[400px] w-full rounded-md shadow-md p-10'>
                <h1 className='text-[#a87c7c] w-fit mx-auto'>Reset Password</h1>
                <div className='mt-10'>
                    <form action="" method="post">
                        <div className='mt-5'>
                            <InputText name='password' label='New Password' type='password' value={values.password} onChange={onChange} errorMsg={errorMsg.password} />
                        </div>
                        <div className='mt-5'>
                            <InputText name='confirm_password' label='Confirm New Password' type='password' value={values.confirm_password} onChange={onChange} errorMsg={errorMsg.confirm_password} />
                        </div>
                        <div className='mt-10 flex justify-center items-center'>
                            <button onClick={handleSubmit} className='w-fit bg-[#503c3c] px-5 py-2 text-white rounded-md shadow-md text-sm hover:bg-[#6e5353] hover:-translate-y-1 duration-300'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword