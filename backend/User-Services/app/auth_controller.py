from flask import request, jsonify
from app.models import User, db
from app.services import generate_token, verify_password, hash_password

def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    new_user =  User(username=username, email=email, password=hash_password(password))
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(password, user.password_hash):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = generate_token(user.id)
    return jsonify({'token': token}), 200

def profile(current_user):
    return jsonify({'message': 'Profile retrieved successfully', 'user': current_user.username}), 200

    
