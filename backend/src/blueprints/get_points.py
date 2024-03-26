from flask import Blueprint, request, jsonify
from bson import ObjectId
import os


get_points_bp = Blueprint("get_points_bp", __name__)

@get_points_bp.route('/videos/get-angles/<video_id>', methods=['GET'])
def get_given_points(video_id):
    from app import mongo
    videos = mongo.db.videos 

    if videos is None:
        return jsonify({'error': 'Videos collection not found'}), 500
    
    try:
        # Convert video_id string to ObjectId
        video_object_id = ObjectId(video_id)

        # Find the video document based on the ObjectId
        video_document = videos.find_one({'_id': video_object_id})

        if video_document:
            video_file_path = video_document.get('path')
            nuber_of_actions = video_document.get('number_of_actions')
            input_points = video_document.get('input_points')

            parent_video_file_path = os.path.dirname(video_file_path)
            print(parent_video_file_path)
            print(nuber_of_actions)
            print(input_points)

            file_name, _ = os.path.splitext(os.path.basename(video_file_path))
            output_video_file_path = os.path.join(parent_video_file_path, 'get_angles_videos', f'{file_name}.mp4')
            output_video_file_path = output_video_file_path.replace("\\", "/")

            print(output_video_file_path)
            

                
        else:
            return jsonify({'error': 'Video not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

