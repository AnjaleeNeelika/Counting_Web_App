import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import VideoInputType from './pages/VideoInputType';
import Navbar from './components/Navbar';
import LiveVideo from './pages/LiveVideo';
import UploadVideo from './pages/UploadVideo';
import NumberOfActions from './pages/NumberOfActions';
import InputPoints from './pages/InputPoints';
import Angles from './pages/Angles';
import ShowCount from './pages/ShowCount';
import DownloadedVideos from './pages/DownloadedVideos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Logout from './pages/Logout';
import LogoutConfirmPopup from './components/LogoutConfirmPopup';
import LoadingPopup from './components/LoadingPopup';

const App = () => {
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowLogoutPopup(true);
    }

    const confirmLogout = () => {
        sessionStorage.removeItem('token');
        setAuthenticated(false);
        setShowLogoutPopup(false);
        navigate('/home');
    }

    const cancelLogout = () => {
        setShowLogoutPopup(false);
    }

    return (
        <div className='w-full h-screen bg-[#f8f4ec]'>
            <Navbar handleLogout={handleLogout} authenticated={authenticated} setAuthenticated={setAuthenticated} />
            <div className='w-full h-[calc(100vh-5rem)] overflow-auto z-0'>
                {showLogoutPopup && (
                    <LogoutConfirmPopup
                        confirmLogout={confirmLogout}
                        cancelLogout={cancelLogout}
                    />
                )}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/video-input-type' element={<VideoInputType />} />
                    <Route path='/video-input-type/live-Video' element={<LiveVideo />} />
                    <Route path='/video-input-type/live-Video/downloaded-videos/no-of-actions' element={<NumberOfActions />} />
                    <Route path='/video-input-type/upload-video' element={<UploadVideo />} />
                    <Route path='/video-input-type/no-of-actions/:uploadID' element={<NumberOfActions />} />
                    <Route path='/video-input-type/no-of-actions/input-points/:uploadID/:numbers' element={<InputPoints />} />
                    <Route path='/video-input-type/angles/:uploadID/:numbers' element={<Angles />} />
                    <Route path='/video-input-type/show-count/:uploadID' element={<ShowCount />} />
                    <Route path='/video-input-type/downloaded-videos' element={<DownloadedVideos />} />
                </Routes>
            </div>
        </div>

    )
}

export default App
