from flask import Blueprint, request, jsonify
from bson import ObjectId

number_of_action_bp = Blueprint("number_of_action_bp", __name__)


def add_number_of_actions_to_collection():
    from app import mongo
    try:

        mongo.db.videos.update_many({}, {'$set': {'number_of_actions': 0}}, upsert=False)

        print("Number of actions added to all documents in the collection successfully.")
    except Exception as e:
        print(f"Error: {str(e)}")


@number_of_action_bp.route("/number_of_action", methods=["POST"])
def number_of_action():
    from app import mongo
    try:
        data = request.json
        print(data)
        number_of_actions = data.get('number_of_actions')
        print(number_of_actions)

        add_number_of_actions_to_collection()

        # Convert string _id to ObjectId
        video_id = ObjectId(data.get('_id'))

        # # Assuming you have a unique identifier for the video, like _id
        # video_id = data.get('_id')
        # print(video_id)

        result = mongo.db.videos.update_one({'_id': video_id}, {'$set': {'number_of_actions': number_of_actions}}, upsert=False)
        print(f"Modified {result.modified_count} document(s)")


        return jsonify({'message': 'Number of actions saved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    


