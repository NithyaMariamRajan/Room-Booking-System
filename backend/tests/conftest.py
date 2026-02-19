import pytest
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app import create_app
from models import db
from config import Config

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

@pytest.fixture
def app():
    app = create_app(TestConfig)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def init_database(app):
    with app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()
