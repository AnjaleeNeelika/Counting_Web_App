from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import dotenv
import os
from flask_jwt_extended import JWTManager

from blueprints.videos_upload import video_upload_bp
from blueprints.view_fulldetect import view_fulldetect_bp
from blueprints.number_of_action import number_of_action_bp
from blueprints.get_angles import get_angles_bp
from blueprints.input_point import input_point_bp
from blueprints.get_points import get_points_bp
from blueprints.token import api
from blueprints.signup import signup_bp
from blueprints.login import login_bp
from blueprints.display_count import display_count_bp
from blueprints.save_angles_db import save_angles_db_bp



app = Flask(__name__)

load_dotenv()

CORS(app)

mongo_uri = os.getenv('MONGO_URI')

app.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app)

secret_key = os.getenv('JWT_SECRET')

app.config['JWT_SECRET_KEY'] = secret_key
jwt = JWTManager(app)

app.register_blueprint(video_upload_bp)
app.register_blueprint(view_fulldetect_bp)
app.register_blueprint(number_of_action_bp)
app.register_blueprint(get_angles_bp)
app.register_blueprint(get_points_bp)
app.register_blueprint(input_point_bp)
app.register_blueprint(display_count_bp)
app.register_blueprint(save_angles_db_bp)
app.register_blueprint(api)
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)

if __name__ == "__main__":
    app.run(debug=True)
