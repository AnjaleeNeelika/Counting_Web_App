
import React, { useState } from 'react';
import { FaFileVideo } from 'react-icons/fa';
import axios from 'axios';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import MessageBox from './MessageBox';
// import { FaFileVideo } from 'react-icons/fa';

const BASE_URL = 'http://localhost:5000';

// function for uploading video
const apiService = {
    uploadVideo: async (file, description) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        try {
            const response = await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            const id = response.data['video_id'];
            console.log(id);
            return id;
        } catch (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
    },
};



const VideoUploader = ({ onVideoUpload }) => {

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [id, setId] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [uploadMsg, setUploadMsg] = useState('');
    const [msgType, setMsgType] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setVideo(URL.createObjectURL(selectedFile));
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Before calling uploadVideo function");
        try {
            const id = await apiService.uploadVideo(file, description);
            console.log('Uploaded video id:', id);
            onVideoUpload(id);
            setId(id);
            alert(`Video uploaded successfully with ID: ${id}`);
            setUploadMsg(`Video uploaded successfullly with ID: ${id}.`);
            setMsgType('success');

            // Redirect or do something else after successful upload
        } catch (error) {
            alert('Failed to upload video. Please try again.');
            console.error('Error:', error);
            setUploadMsg('Failed to upload the video. Please try again.');
            setMsgType('warning');
        }
    };


    return (
        <div className='w-full'>
            {uploadMsg &&
                <div>
                    <MessageBox type={msgType} message={uploadMsg} />
                </div>
            }
            <form className='w-full'>
                <input
                    type="file"
                    accept='video/mp4, video/quicktime'
                    className='input-field'
                    hidden
                    onChange={handleFileChange}
                />
                <div
                    className='flex flex-col justify-center items-center h-[300px] md:h-[400px] w-full md:w-[800px] p-2 cursor-pointer border-2 border-dashed border-[#a87c7cbb] rounded-lg'
                    onClick={() => document.querySelector('.input-field').click()}
                >
                    {video ?
                        <video className='h-full w-full' controls autoPlay loop muted>
                            <source src={video} type='video/mp4' />
                            <source src={video} type='video/quicktime' />
                        </video>
                        :
                        <>
                            <MdCloudUpload className='h-24 w-24 opacity-40 text-[#a87c7c]' />
                            <p className='opacity-70 text-[#a87c7c]'>Browse Files to Upload</p>
                        </>
                    }
                </div>
                <section className='flex flex-wrap md:justify-between justify-center items-center gap-5 bg-[#85586f] mt-3 p-4 text-[#ffefef] rounded-lg'>
                    <div className='flex flex-wrap gap-2 justify-between items-center'>
                        <FaFileVideo className='#1475cf h-5 w-5' />
                        <span className='flex gap-1 justify-center items-center'>
                            {fileName}
                            <MdDelete
                                onClick={() => {
                                    setFile(null);
                                    setFileName("No file selected");
                                    setVideo(null);
                                }}
                                className='w-5 h-5 cursor-pointer'
                            />
                        </span>
                    </div>

                    <button className='' onClick={handleSubmit}>Upload</button>
                </section>
            </form>
        </div>
    )
}

export default VideoUploader;
