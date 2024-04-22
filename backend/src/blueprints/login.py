from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt

login_bp = Blueprint('login_bp', __name__)

bcrypt = Bcrypt()

@login_bp.route('/login', methods=['POST'])
def login():
    from app import mongo
    users = mongo.db.users

    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email not in users or not bcrypt.check_password_hash(users[email]['password'], password):
        return jsonify({'message': 'User not found'}), 401
 
    return 'User Login'