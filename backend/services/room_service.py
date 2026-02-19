from models import db, Room, Booking
from sqlalchemy.exc import IntegrityError
from datetime import datetime

class RoomService:
    @staticmethod
    def create_room(data):
        room = Room(name=data['name'], capacity=data['capacity'])
        db.session.add(room)
        try:
            db.session.commit()
            return room
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Room with this name already exists")

    @staticmethod
    def get_all_rooms():
        return Room.query.all()

    @staticmethod
    def get_room(room_id):
        return Room.query.get_or_404(room_id)

    @staticmethod
    def delete_room(room_id):
        room = Room.query.get_or_404(room_id)
        # Check for future bookings
        future_bookings = Booking.query.filter(
            Booking.room_id == room_id,
            Booking.start_date > datetime.now()
        ).first()
        
        if future_bookings:
            raise ValueError("Cannot delete room with future bookings")
            
        db.session.delete(room)
        db.session.commit()
