import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO
import cv2
import base64
import time
import threading
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app2 = Flask(__name__)
CORS(app2)

# Set up MongoDB connection
mongo_uri = os.getenv('MONGO_URI')
if not mongo_uri:
    raise ValueError("No MONGO_URI found in environment variables")
print(f"Using Mongo URI: {mongo_uri}")
app2.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app2)

# Import and register blueprints
from blueprints.testing import testing_bp
app2.register_blueprint(testing_bp)

# Initialize SocketIO
socketio = SocketIO(app2, cors_allowed_origins="*")

video_file_path = './sample-vid-1.mp4'

def send_video_frames():
    print("start")
    cap = cv2.VideoCapture(video_file_path)
    print("Sending video frames...")
    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            print("hoiooooooooo")
            ret, buffer = cv2.imencode('.jpg', frame)
            if ret:
                img_str = base64.b64encode(buffer).decode('utf-8')
                socketio.emit('video_frame', {'image': img_str})
                time.sleep(0.00005)
        else:
            break
    cap.release()

@socketio.on('connect')
def on_connect():
    print('Client connected')
    video_thread = threading.Thread(target=send_video_frames)
    video_thread.start()

@socketio.on('disconnect')
def on_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app2, host='0.0.0.0', port=5000, debug=True, use_reloader=True)
