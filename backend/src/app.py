from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

from blueprints.videos_upload import video_upload_bp
from blueprints.view_fulldetect import view_fulldetect_bp
from blueprints.number_of_action import number_of_action_bp
from blueprints.get_angles import get_angles_bp
from blueprints.input_point import input_point_bp
from blueprints.get_points import get_points_bp


app = Flask(__name__)

CORS(app)


app.config['MONGO_URI'] = 'mongodb://localhost/mediapipe-project'
mongo = PyMongo(app)

app.register_blueprint(video_upload_bp)
app.register_blueprint(view_fulldetect_bp)
app.register_blueprint(number_of_action_bp)
app.register_blueprint(get_angles_bp)
app.register_blueprint(get_points_bp)
app.register_blueprint(input_point_bp)


if __name__ == "__main__":
    app.run(debug=True)









