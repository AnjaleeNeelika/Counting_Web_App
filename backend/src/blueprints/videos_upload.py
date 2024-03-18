from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename



video_upload_bp = Blueprint("video_upload_bp", __name__)



app_root = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(os.path.dirname(app_root))
parent_directory = os.path.dirname(parent)

UPLOAD_FOLDER = os.path.join(parent_directory, 'frontend', 'public', 'videos')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename): 
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp4', 'mov'}





@video_upload_bp.route("/upload", methods=['POST'])
def upload_video():
    from app import mongo
    videos = mongo.db.videos  # Access the 'videos' collection from the 'mongo' object
    if videos is None:
        return jsonify({'error': 'Videos collection not found'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        video_path = os.path.join(UPLOAD_FOLDER, filename).replace('\\', '/')
        description = request.form.get('description', '')
        video_data = {
            'path': video_path,
            'description': description
        }
        video_id = videos.insert_one(video_data).inserted_id
        return jsonify({'message': 'Video uploaded successfully', 'video_id': str(video_id)})
    else:
        return jsonify({'error': 'Invalid file format'}), 400
