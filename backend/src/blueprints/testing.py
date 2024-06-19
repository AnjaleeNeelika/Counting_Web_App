from flask import Blueprint, jsonify
from flask_socketio import SocketIO, emit
import threading
import time
import base64
import cv2

testing_bp = Blueprint("testing_bp", __name__)
socketio = SocketIO(cors_allowed_origins="*")

def send_video_frames():
    print("start")
    cap = cv2.VideoCapture('./sample-vid-1.mp4')  # Open the video file
    print("Sending video frames...")
    while cap.isOpened():
        ret, frame = cap.read()  # Read a frame from the video
        if ret:
            print("Sending video frame...")
            # Convert the frame to JPEG format
            ret, buffer = cv2.imencode('.jpg', frame)
            if ret:
                # Convert the image buffer to base64 string
                img_str = base64.b64encode(buffer).decode('utf-8')
                # Send the base64 encoded image to clients
                socketio.emit('video_frame', {'image': img_str})
                time.sleep(0.1)  # Adjust delay as needed for frame rate
        else:
            break
    cap.release()

@testing_bp.route('/')
def start_video_stream():
    print('Client connected')
    video_thread = threading.Thread(target=send_video_frames)
    video_thread.start()
    return jsonify({'message': 'Video streaming started'})

if __name__ == "__main__":
    socketio.run(debug=True)
