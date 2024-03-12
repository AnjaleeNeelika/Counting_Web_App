
import React, { useState } from 'react';
import { FaFileVideo } from 'react-icons/fa';
import axios from 'axios';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
// import { FaFileVideo } from 'react-icons/fa';

const BASE_URL = 'http://localhost:8080';


const apiService = {
    uploadVideo: async (file, description) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        try {
            const response = await axios.post(`${BASE_URL}/videos/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            const id = response.data;
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

            // Redirect or do something else after successful upload
        } catch (error) {
            alert('Failed to upload video. Please try again.');
            console.error('Error:', error);
        }
    };


    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept='video/mp4, video/mov'
                    className='input-field'
                    hidden
                    onChange={handleFileChange}
                />
                <div
                    className='flex flex-col justify-center items-center h-[300px] w-[500px] p-2 cursor-pointer border-2 border-dashed border-[#a87c7cbb] rounded-lg'
                    onClick={() => document.querySelector('.input-field').click()}
                >
                    {video ?
                        <video className='h-full w-full' controls autoPlay loop>
                            <source src={video} type='video/mp4' />
                        </video>
                        :
                        <>
                            <MdCloudUpload className='h-24 w-24 opacity-40 text-[#a87c7c]' />
                            <p className='opacity-70 text-[#a87c7c]'>Browse Files to Upload</p>
                        </>
                    }
                </div>
                <section className='flex justify-between items-center bg-[#85586f] mt-3 p-4 text-[#ffefef] rounded-lg'>
                    <FaFileVideo className='#1475cf h-5 w-5' />
                    <span className='flex gap-2 justify-center items-center'>
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
                    <button type="submit">Upload</button>
                </section>
            </form>
        </div>
    )
}

export default VideoUploader;
