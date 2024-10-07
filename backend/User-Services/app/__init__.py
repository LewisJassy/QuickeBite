from flask import Flask
from app.routes import user_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Register Blueprints
    app.register_blueprint(user_blueprint, url_prefix='/users')
    
    return app
