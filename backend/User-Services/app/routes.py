from flask import Blueprint
from .auth_controller import register, login, profile
from .utils import token_required

user_blueprint = Blueprint('auth', __name__)

@user_blueprint.route('/')
def home():
    return 'Welcome to QuickeBite user services API'

user_blueprint.route('/register', methods=['POST'])(register)
user_blueprint.route('/login', methods=['POST'])(login)
user_blueprint.route('/profile', methods=['GET'])(token_required(profile))