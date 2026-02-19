from marshmallow import Schema, fields, validate


class RoomSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    capacity = fields.Int(required=True, validate=validate.Range(min=1))


class BookingSchema(Schema):
    id = fields.Int(dump_only=True)
    room_id = fields.Int(required=True)
    start_date = fields.DateTime(required=True)
    end_date = fields.DateTime(required=True)

    # 👇 This adds room name in response
    room_name = fields.Method("get_room_name", dump_only=True)

    def get_room_name(self, obj):
        return obj.room.name if obj.room else None
