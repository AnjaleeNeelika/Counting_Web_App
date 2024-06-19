# from flask import Blueprint, jsonify
# from flask_socketio import SocketIO, emit
# from subprocess import call

# websocket_bp = Blueprint("websocket_bp", __name__)

# @websocket_bp.route('/videos/websocket/<video_id>', methods=['GET'])
# def open_py_file(video_id):
#     # This is where you would use the video_id if needed
#     call(["python", "socketio_server.py"])
#     return jsonify({"message": "socketio_server.py started"}), 200
from flask import Flask, Blueprint, jsonify
from subprocess import Popen

websocket_bp = Blueprint("websocket_bp", __name__)

@websocket_bp.route('/videos/websocket/<video_id>', methods=['GET'])
def open_py_file(video_id):
    print("mmmmmmmmmmmmmmmmmm")
    # Call the socketio_server.py script
    Popen(["python", "socketio_server.py"])
    return jsonify({"message": "socketio_server.py started"}), 200
