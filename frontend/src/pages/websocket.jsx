import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000'; // Change this to the root URL of your Flask app

const Websocket = () => {
    const [videoFrame, setVideoFrame] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on('video_frame', (data) => {
            console.log('Received video frame:', data);
            setVideoFrame(data.image);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            {videoFrame && <img src={`data:image/jpeg;base64,${videoFrame}`} alt="Video Frame" />}
        </div>
    );
};

export default Websocket;
