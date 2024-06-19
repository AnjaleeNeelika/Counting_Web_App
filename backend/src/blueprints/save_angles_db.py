from flask import Blueprint, request, jsonify
from bson import ObjectId

save_angles_db_bp = Blueprint('save_angles_db_bp',__name__)

@save_angles_db_bp.route('/save_angles_db', methods =['POST'])
def save_angles():
    from app import mongo
    try:
        print("hiiiiiiiiii")
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400
        
        video_id = data['_id']
        videos = mongo.db.videos

        if videos is None:
            return jsonify({'error': 'Videos collection not found'}), 500
        
        # Delete existing input points for the video
        videos.update_one({'_id': ObjectId(video_id)}, {'$unset': {'angles': ""}})
        
        angles_data = data.get('angles', [])

        result = videos.update_one({'_id': ObjectId(video_id)}, {'$push': {'angles': {'$each': angles_data}}}, upsert=False)
        print(f"Modified {result.modified_count} document(s)")


        return  jsonify ({'success': True}), 200

    except Exception as e:
        return jsonify({'error':str(e)}), 500 