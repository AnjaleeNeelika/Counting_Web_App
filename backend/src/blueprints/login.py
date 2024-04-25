from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

login_bp = Blueprint('login_bp', __name__)
logout_bp = Blueprint('logout_bp', __name__)

bcrypt = Bcrypt()

@login_bp.route('/login', methods=['POST'])
def login():
    from app import mongo
    users = mongo.db.users

    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({'email': email})

    if user is None:  
        return jsonify({'error': 'User not found'}), 401   

    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Incorrect password'}), 401
    
    # Generate JWT token
    access_token = create_access_token(identity=str(user['_id'])) 

    return jsonify({'access_token': access_token}), 201


@logout_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()

    return jsonify({'message': 'Logged out successfully'}), 200

        