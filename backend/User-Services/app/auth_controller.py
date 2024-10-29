from flask import Blueprint, request, jsonify, current_app
from app.models import User
from app import db, bcrypt, jwt

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    print("Trying to register")
    try:
        data = request.get_json()
        print(f"Received data: username={data.get('username')}, email={data.get('email')}, password=testPassword")
        
        # Check if user already exists
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Email already registered'}), 400

        # Create new user
        hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password_hash=hashed_password
        )
        
        # Add and commit within a try block to catch potential database errors
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Database error: {str(e)}")
            return jsonify({'error': 'Database error occurred'}), 500

        return jsonify({'message': 'Registration successful'}), 201
        
    except Exception as e:
        print(f"Error in registration: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode({'id': user.id}, current_app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token}), 200

@auth_blueprint.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401
    
    try:
        data = jwt.decode(token, verify=False)
        user_id = data['id']
        user = User.query.get(user_id)
    except:
        return jsonify({'message': 'Token is invalid'}), 401
    
    return jsonify({'message': 'Profile retrieved successfully', 'user': user.username}), 200
