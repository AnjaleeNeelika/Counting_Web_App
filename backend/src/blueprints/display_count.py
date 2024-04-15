from flask import Blueprint, request, jsonify
from bson import ObjectId
import os


display_count_bp = Blueprint("display_count_bp", __name__)

@display_count_bp.route('/videos/display-count/<video_id>', methods=['GET'])
def get_display_count(video_id):
    from app import mongo
    videos = mongo.db.videos
    if videos is None:
        return "Error connecting to database"
    
    try:
        video_object_id = ObjectId(video_id)
        video_document = videos.find_one({'_id': video_object_id})

        if video_document:
            video_file_path = video_document.get("path")
            number_of_actions = video_document.get('number_of_actions')
            angles = video_document.get('angles')

            # Construct a response JSON
            response_data = {
                'video_id': str(video_object_id),
                'path': video_file_path,
                'number_of_actions': number_of_actions,
                'angles': angles
            }

            angle_list = []

            for angles in angles:
                start = int(angles['start'])
                end = int(angles['end'])

                angle = [start, end]
                angle_list.append(angle) 

            print(angle_list)  

            return jsonify(response_data), 200 

        else:
            return jsonify({'error':'video not found'}), 400
        

    except Exception as  e:
        return jsonify({'error': str(e)}), 500

