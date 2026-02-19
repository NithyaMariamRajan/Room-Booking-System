from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    bookings = db.relationship('Booking', backref='room', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Room {self.name}>'

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Booking {self.id} Room:{self.room_id}>'
