import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isActive, setIsActive] = useState('home');

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        const currentPath = location.pathname.split('/')[1];
        handleActiveLink(currentPath);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    const handleActiveLink = (link) => {
        setIsActive(link);
    }

    return (
        <div>
            {/* <nav className={`flex justify-between items-center p-5 shadow-[0_10px_20px_rgb(0,0,0,0.10)] bg-[#402b3a] ${isScrolled ? 'shadow-[0_20px_30px_rgb(0,0,0,0.28)]' : ''}`}> */}
            <nav className='w-full h-[5rem] flex justify-between items-center p-5 bg-[#402b3a] shadow-[0_20px_30px_rgb(0,0,0,0.28)] z-50'>
                <a href="" className='text-white text-3xl font-semibold'>Counting App</a>

                <div>
                    <ul className={`h-fit md:flex md:justify-between md:items-center gap-10 md:py-0 py-10 absolute md:static md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 transition-200 ease-in bg-white md:bg-transparent md:text-white ${open ? 'top-20 opacity-100 shadow-md' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
                        <li className={`w-fit hover:text-pink-300 transition-300 hover:border-b-2 hover:border-b-pink-300 hover:pb-1 md:mb-0 mb-5 ${isActive === 'home' ? 'text-pink-300 border-b-2 border-b-pink-300 pb-1' : ''}`}>
                            <Link to='/home' onClick={() => handleActiveLink('home')}>Home</Link>
                        </li>
                        <li className={`w-fit hover:text-pink-300 transition-300 hover:border-b-2 hover:border-b-pink-300 hover:pb-1 md:mb-0 mb-5 ${isActive === 'reports' ? 'text-pink-300 border-b-2 border-b-pink-300 pb-1' : ''}`}>
                            <Link to='/reports' onClick={() => handleActiveLink('reports')}>Reports</Link>
                        </li>
                        <li className={`w-fit hover:text-pink-300 transition-300 hover:border-b-2 hover:border-b-pink-300 hover:pb-1 md:mb-0 mb-5 ${isActive === 'video-input-type' ? 'text-pink-300 border-b-2 border-b-pink-300 pb-1' : ''}`}>
                            <Link to='/video-input-type' onClick={() => handleActiveLink('video-input-type')}>Start Counting</Link>
                        </li>
                        <li>
                            <Link to='/login'>
                                <button className='bg-[#a87c7c] text-white px-4 py-2 text-sm rounded-full hover:bg-[#997171] hover:-translate-y-1 duration-500 transform shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-[#694e4e]'>Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div onClick={() => setOpen(!open)} className='text-2xl absolute right-8 top-7 cursor-pointer md:hidden text-white hover:text-pink-300'>                    
                    {open ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div>     
            </nav>
        </div>
    )
}

export default Navbar