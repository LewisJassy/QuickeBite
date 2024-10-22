import sys
import os
import pytest
from flask_jwt_extended import create_access_token

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from app import create_app, db
from app.models import User
from app.services import UserService

@pytest.fixture(scope='module')
def app():
    flask_app = create_app()
    flask_app.config['TESTING'] = True
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with flask_app.app_context():
        db.create_all()
    yield flask_app

    with flask_app.app_context():
        db.drop_all()

@pytest.fixture(scope='module')
def test_client(app):
    return app.test_client()

@pytest.fixture(scope='module')
def init_database(app):
    with app.app_context():
        user_service = UserService()
        user_service.create_user({
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'password123'
        })
        yield db

        db.session.remove()
        db.drop_all()

def test_register_user(app):
    with app.app_context():
        user_service = UserService()
        response = user_service.create_user({
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123'
        })
        assert 'id' in response
        assert response['username'] == 'newuser'

def test_register_existing_user(app, init_database):
    with app.app_context():
        user_service = UserService()
        response = user_service.create_user({
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'password123'
        })
        assert 'error' in response
        assert response['error'] == 'Email already registered'

def test_login_user(app, init_database):
    with app.app_context():
        user_service = UserService()
        response = user_service.authenticate_user({
            'email': 'testuser@example.com',
            'password': 'password123'
        })
        assert 'access_token' in response

def test_login_invalid_user(app):
    with app.app_context():
        user_service = UserService()
        response = user_service.authenticate_user({
            'email': 'invalid@example.com',
            'password': 'password123'
        })
        assert 'error' in response
        assert response['error'] == 'Invalid credentials'

def test_get_user_profile(test_client, app, init_database):
    with app.app_context():
        user_service = UserService()
        user = User.query.filter_by(email='testuser@example.com').first()
        access_token = create_access_token(identity=user.id)
        
        response = test_client.get('/profile', headers={
            'Authorization': f'Bearer {access_token}'
        })
        assert response.status_code == 200
        assert response.json['username'] == 'testuser'