import jwt
import datetime
from app.models import User
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

def generate_token(user_id):
    """
    Generate a JWT token for authentication
    """
    token = jwt.encode({
        'id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    return token

def verify_password(password, hashed_password):
    """
    Verify a password against a hashed password
    """
    return check_password_hash(hashed_password, password)

def hash_password(password):
    """
    Hash a password before storing it in the database
    """
    return generate_password_hash(password)
    