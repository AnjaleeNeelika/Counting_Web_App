from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient

signup_bp = Blueprint('signup_bp', __name__)

bcrypt = Bcrypt()

@signup_bp.route('/signup', methods=['POST'])
def user_signup():
    from app import mongo
    users = mongo.db.users
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # check if the email already exist in the database
    existing_user = users.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    # hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.insert_one({'name': name, 'email': email, 'password': hashed_password})

    return jsonify({'message': 'User created successfully'}), 201

