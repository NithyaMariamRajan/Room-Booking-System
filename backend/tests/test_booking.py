import pytest
from datetime import datetime, timedelta
from services.room_service import RoomService
from services.booking_service import BookingService

def test_create_room(init_database, app):
    with app.app_context():
        room = RoomService.create_room({'name': 'Conference A', 'capacity': 10})
        assert room.id is not None
        assert room.name == 'Conference A'

def test_prevent_booking_in_past(init_database, app):
    with app.app_context():
        room = RoomService.create_room({'name': 'Room 1', 'capacity': 5})
        past_start = datetime.now() - timedelta(days=1)
        past_end = datetime.now() - timedelta(hours=23)
        
        with pytest.raises(ValueError, match="Cannot book in the past"):
            BookingService.create_booking({
                'room_id': room.id,
                'start_date': past_start,
                'end_date': past_end
            })

def test_prevent_overlapping_bookings(init_database, app):
    with app.app_context():
        room = RoomService.create_room({'name': 'Room 1', 'capacity': 5})
        start1 = datetime.now() + timedelta(days=1)
        end1 = start1 + timedelta(hours=2)
        
        # First booking
        BookingService.create_booking({
            'room_id': room.id,
            'start_date': start1,
            'end_date': end1
        })
        
        # Overlapping booking (starts inside first)
        start2 = start1 + timedelta(minutes=30)
        end2 = end1 + timedelta(minutes=30)
        
        with pytest.raises(ValueError, match="Room is already booked"):
            BookingService.create_booking({
                'room_id': room.id,
                'start_date': start2,
                'end_date': end2
            })

def test_start_after_end(init_database, app):
    with app.app_context():
        room = RoomService.create_room({'name': 'Room 1', 'capacity': 5})
        start = datetime.now() + timedelta(days=1)
        end = start - timedelta(hours=1) # End before start
        
        with pytest.raises(ValueError, match="Start date must be before end date"):
            BookingService.create_booking({
                'room_id': room.id,
                'start_date': start,
                'end_date': end
            })

def test_delete_room_with_future_bookings(init_database, app):
    with app.app_context():
        room = RoomService.create_room({'name': 'Room 1', 'capacity': 5})
        start = datetime.now() + timedelta(days=1)
        end = start + timedelta(hours=1)
        
        BookingService.create_booking({
            'room_id': room.id,
            'start_date': start,
            'end_date': end
        })
        
        with pytest.raises(ValueError, match="Cannot delete room with future bookings"):
            RoomService.delete_room(room.id)
