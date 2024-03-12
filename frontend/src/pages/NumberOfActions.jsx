import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button1 from '../components/Button1';

const NumberOfActions = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    return (
        <div className='w-full h-full overflow-auto p-10 flex flex-wrap justify-center items-center'>
            <div>
                <form className='bg-slate-50 w-fit h-fit px-5 py-5 mx-auto rounded-md shadow-md'>
                    <h2 className='mx-auto w-fit text-[#8a5374]'>Count the Number of Steps Per One Action</h2>
                    <div className='w-fit mx-auto flex justify-between items-center gap-10 mt-3 mb-8'>
                        <span className='text-sm'>Enter the number of steps</span>
                        <input type="text" name="" id=""  className='text-sm border-2 border-[#ddd] hover:border-[#b89ead] focus:border-[#b89ead] outline-none px-4 py-2 rounded' />
                    </div>
                    <Link to={{ pathname: '/video-input-type/no-of-actions/input-points' }}>
                        <Button1>Enter</Button1>
                    </Link>                    
                </form> 
                <div className='bg-slate-300 w-[50vw] h-[60vh] mx-auto mt-10'>
                
                </div>
                  
            </div>
                  
        </div>
    )
}

export default NumberOfActions