import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

const App = () => {
    return (
        <div className='w-full h-screen bg-[#f8f4ec]'>
            <Navbar />
            <div className='w-full h-[calc(100vh-5rem)] overflow-auto z-0'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/video-input-type' element={<VideoInputType />} />
                    <Route path='/video-input-type/live-Video' element={<LiveVideo />} />
                    <Route path='/video-input-type/live-Video/downloaded-videos/no-of-actions' element={<NumberOfActions />} />
                    <Route path='/video-input-type/upload-video' element={<UploadVideo />} />
                    <Route path='/video-input-type/no-of-actions/:uploadID' element={<NumberOfActions />} />
                    <Route path='/video-input-type/no-of-actions/input-points/:uploadID' element={<InputPoints />} />
                    <Route path='/video-input-type/angles/:uploadID' element={<Angles />} />
                    <Route path='/video-input-type/show-count' element={<ShowCount />} />
                    <Route path='/video-input-type/downloaded-videos' element={<DownloadedVideos />} />
                </Routes>
            </div>
        </div>

    )
}

export default App
