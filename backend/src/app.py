
# from flask import Flask, jsonify
# from flask_socketio import SocketIO, emit
# from flask_cors import CORS
# from flask_pymongo import PyMongo
# from dotenv import load_dotenv
# import os
# from flask_jwt_extended import JWTManager


# from blueprints.videos_upload import video_upload_bp
# from blueprints.view_fulldetect import view_fulldetect_bp
# from blueprints.number_of_action import number_of_action_bp
# from blueprints.get_angles import get_angles_bp
# from blueprints.input_point import input_point_bp
# from blueprints.get_points import get_points_bp
# from blueprints.token import api
# from blueprints.save_angles_db import  save_angles_db_bp
# from blueprints.display_count import  display_count_bp
# from blueprints.websocket import websocket_bp


# app = Flask(__name__)

# load_dotenv()

# CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")

# # Initialize SocketIO
# socketio = SocketIO(app)


# mongo_uri = os.getenv('MONGO_URI')


# app.config['MONGO_URI'] = mongo_uri
# mongo = PyMongo(app)

# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'sample key')
# jwt = JWTManager(app)

# app.register_blueprint(video_upload_bp)
# app.register_blueprint(view_fulldetect_bp)
# app.register_blueprint(number_of_action_bp)
# app.register_blueprint(get_angles_bp)
# app.register_blueprint(get_points_bp)
# app.register_blueprint(input_point_bp)
# app.register_blueprint(save_angles_db_bp)
# app.register_blueprint(display_count_bp)
# app.register_blueprint(api)
# app.register_blueprint(websocket_bp)


# # if __name__ == "__main__":
# #     app.run(debug=True)



# if __name__ == '__main__':
#     socketio.run(app, debug=True)







# from flask import Flask, jsonify
# from flask_socketio import SocketIO, emit
# from flask_cors import CORS
# from flask_pymongo import PyMongo
# from dotenv import load_dotenv
# import os
# from flask_jwt_extended import JWTManager
# import threading
# import time
# import base64
# import cv2

# from blueprints.videos_upload import video_upload_bp
# from blueprints.view_fulldetect import view_fulldetect_bp
# from blueprints.number_of_action import number_of_action_bp
# from blueprints.get_angles import get_angles_bp
# from blueprints.input_point import input_point_bp
# from blueprints.get_points import get_points_bp
# from blueprints.token import api
# from blueprints.save_angles_db import save_angles_db_bp
# from blueprints.display_count import display_count_bp

# app = Flask(__name__)

# # Load environment variables
# load_dotenv()

# # Enable CORS
# CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")

# # # Initialize SocketIO
# # socketio = SocketIO(app)

# # Configure MongoDB
# mongo_uri = os.getenv('MONGO_URI')
# app.config['MONGO_URI'] = mongo_uri
# mongo = PyMongo(app)

# # Configure JWT
# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'sample key')
# jwt = JWTManager(app)

# # Register blueprints
# app.register_blueprint(video_upload_bp)
# app.register_blueprint(view_fulldetect_bp)
# app.register_blueprint(number_of_action_bp)
# app.register_blueprint(get_angles_bp)
# app.register_blueprint(get_points_bp)
# app.register_blueprint(input_point_bp)
# app.register_blueprint(save_angles_db_bp)
# app.register_blueprint(display_count_bp)
# app.register_blueprint(api)

# def send_video_frames():
#     print("start")
#     cap = cv2.VideoCapture('./sample-vid-1.mp4')  # Open the video file
#     print("Sending video frames...")
#     while cap.isOpened():
#         ret, frame = cap.read()  # Read a frame from the video
#         if ret:
#             print("hoiooooooooo")
#             # Convert the frame to JPEG format
#             ret, buffer = cv2.imencode('.jpg', frame)
#             if ret:
#                 # Convert the image buffer to base64 string
#                 img_str = base64.b64encode(buffer).decode('utf-8')
#                 # Send the base64 encoded image to clients
#                 socketio.emit('video_frame', {'image': img_str})
#                 time.sleep(0.1)  # Adjust delay as needed for frame rate
#         else:
#             break
#     cap.release()

# # Start sending video frames in a separate thread when a client connects
# @socketio.on('connect')
# def on_connect():
#     print('Client connected')
#     video_thread = threading.Thread(target=send_video_frames)
#     video_thread.start()

# # Handle disconnect event (optional)
# @socketio.on('disconnect')
# def on_disconnect():
#     print('Client disconnected')

# if __name__ == '__main__':
#     socketio.run(app, debug=True)




from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager

from blueprints.videos_upload import video_upload_bp
from blueprints.view_fulldetect import view_fulldetect_bp
from blueprints.number_of_action import number_of_action_bp
from blueprints.get_angles import get_angles_bp
from blueprints.input_point import input_point_bp
from blueprints.get_points import get_points_bp
from blueprints.token import api
from blueprints.save_angles_db import save_angles_db_bp
from blueprints.display_count import display_count_bp
from blueprints.websocket import websocket_bp


app = Flask(__name__)
load_dotenv()
CORS(app)

mongo_uri = os.getenv('MONGO_URI')
app.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'sample key')
jwt = JWTManager(app)

app.register_blueprint(video_upload_bp)
app.register_blueprint(view_fulldetect_bp)
app.register_blueprint(number_of_action_bp)
app.register_blueprint(get_angles_bp)
app.register_blueprint(get_points_bp)
app.register_blueprint(input_point_bp)
app.register_blueprint(save_angles_db_bp)
app.register_blueprint(display_count_bp)
app.register_blueprint(api)
app.register_blueprint(websocket_bp)


if __name__ == "__main__":
    app.run(debug=True)
