from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes.rooms import rooms_bp
from routes.bookings import bookings_bp
import os

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Register blueprints
    app.register_blueprint(rooms_bp, url_prefix='/api/rooms')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')

    # Create tables
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
