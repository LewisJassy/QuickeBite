from flask import Blueprint
from .auth_controller import auth_blueprint


@auth_blueprint.route('/')
def home():
    return 'Welcome to QuickeBite user services API'

auth_blueprint.route('/register', methods=['POST'])
auth_blueprint.route('/login', methods=['POST'])
auth_blueprint.route('/profile', methods=['GET'])