from models import db, Booking, Room
from datetime import datetime
from sqlalchemy import  and_, or_

class BookingService:
    @staticmethod
    def create_booking(data):
        room_id = data['room_id']
        start_date = data['start_date']
        end_date = data['end_date']

        # 1. Validate Room exists
        room = Room.query.get(room_id)
        if not room:
            raise ValueError("Room not found")

        # 2. Prevent booking in the past
        if start_date < datetime.now():
            raise ValueError("Cannot book in the past")

        # 3. Start date must be before end date
        if start_date >= end_date:
            raise ValueError("Start date must be before end date")
            
        # 4. Prevent overlapping bookings
        # Overlap if: (NewStart < ExistingEnd) and (NewEnd > ExistingStart)
        overlapping = Booking.query.filter(
            Booking.room_id == room_id,
            Booking.start_date < end_date,
            Booking.end_date > start_date
        ).first()

        if overlapping:
            raise ValueError("Room is already booked for this time period")

        booking = Booking(room_id=room_id, start_date=start_date, end_date=end_date)
        db.session.add(booking)
        db.session.commit()
        return booking

    @staticmethod
    def get_all_bookings():
        return Booking.query.all()
