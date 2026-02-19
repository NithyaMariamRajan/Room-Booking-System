from flask import Blueprint, request, jsonify
from schemas.schemas import BookingSchema
from services.booking_service import BookingService
from marshmallow import ValidationError
from models import Booking, db

bookings_bp = Blueprint('bookings', __name__)
booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)


# ------------------ CREATE BOOKING ------------------
@bookings_bp.route('/', methods=['POST'])
def create_booking():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        data = booking_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 422

    try:
        booking = BookingService.create_booking(data)
        return booking_schema.dump(booking), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ GET BOOKINGS ------------------
@bookings_bp.route('/', methods=['GET'])
def get_bookings():
    bookings = BookingService.get_all_bookings()
    return jsonify(bookings_schema.dump(bookings)), 200


# ------------------ DELETE BOOKING ------------------
@bookings_bp.route('/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    db.session.delete(booking)
    db.session.commit()

    return jsonify({"message": "Booking deleted successfully"}), 200
