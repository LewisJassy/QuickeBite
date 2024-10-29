import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'lewis@uon'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///user_service.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'lewis@uon'