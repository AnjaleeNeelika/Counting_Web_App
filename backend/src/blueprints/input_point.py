from flask import Blueprint, request, jsonify
from bson import ObjectId

input_point_bp = Blueprint('input_points_bp', __name__)

@input_point_bp.route('/input_points', methods=['POST'])
def input_points():
    from app import mongo
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400

        video_id = data['_id']
        videos = mongo.db.videos
        
        if videos is None:
            return jsonify({'error': 'Videos collection not found'}), 500
        
        # Get the input points from the data
        input_points_data = data.get('input_points', [])

                # Update the existing document by pushing the new input points
        result = videos.update_one({'_id': ObjectId(video_id)}, {'$push': {'input_points': {'$each': input_points_data}}}, upsert=False)
        print(f"Modified {result.modified_count} document(s)")

        return jsonify({'success': True}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
