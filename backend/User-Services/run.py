from app import create_app, db
# import os

# os.environ['DATABASE_URL'] = 'sqlite:///user_service.db'

app = create_app()
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
