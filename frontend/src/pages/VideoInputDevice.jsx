// DeviceSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoInputDevice = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const mediaDevices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = mediaDevices.filter(device => device.kind === 'videoinput');
                setDevices(videoDevices);
            } catch (error) {
                console.error('Error enumerating devices:', error);
            }
        };

        fetchDevices();
    }, []);

    const handleChange = (e) => {
        setSelectedDevice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/backend-url', { deviceId: selectedDevice });
            console.log('Device ID sent to backend:', selectedDevice);
        } catch (error) {
            console.error('Error sending device ID:', error);
        }
    };

    return (
        <div>
            <h1>Select Video Input Device</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedDevice} onChange={handleChange}>
                    <option value="">Select a video input device</option>
                    {devices.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>{device.label || `Device ${device.deviceId}`}</option>
                    ))}
                </select>
                <button type="submit" disabled={!selectedDevice}>Send to Backend</button>
            </form>
        </div>
    );
};

export default VideoInputDevice;
