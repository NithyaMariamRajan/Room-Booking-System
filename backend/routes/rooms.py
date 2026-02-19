from flask import Blueprint, request, jsonify
from schemas.schemas import RoomSchema
from services.room_service import RoomService
from marshmallow import ValidationError

rooms_bp = Blueprint('rooms', __name__)
room_schema = RoomSchema()
rooms_schema = RoomSchema(many=True)

@rooms_bp.route('/', methods=['POST'])
def create_room():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400
    
    try:
        data = room_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 422

    try:
        room = RoomService.create_room(data)
        return room_schema.dump(room), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@rooms_bp.route('/', methods=['GET'])
def get_rooms():
    rooms = RoomService.get_all_rooms()
    return jsonify(rooms_schema.dump(rooms)), 200

@rooms_bp.route('/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    try:
        RoomService.delete_room(room_id)
        return jsonify({"message": "Room deleted"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Room not found or server error"}), 404
