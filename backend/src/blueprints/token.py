from flask import Blueprint, jsonify, request
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint("api", __name__)

# Create a token and return JWT
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email != 'test' or password != 'test':
        return jsonify({ "msg": "Bad email or password" }), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
