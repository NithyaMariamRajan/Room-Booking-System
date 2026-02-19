import { useState, useEffect, FormEvent } from 'react';
import api from '../api';
import { Room } from '../types';

interface CreateBookingProps {
    onBookingCreated: () => void;
}

function CreateBooking({ onBookingCreated }: CreateBookingProps) {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomId, setRoomId] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get('/rooms/');
                setRooms(response.data);
                if (response.data.length > 0) {
                    setRoomId(String(response.data[0].id));
                }
            } catch (err) {
                console.error("Failed to load rooms");
            }
        };
        fetchRooms();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!roomId || !startDate || !endDate) {
            setError('All fields are required');
            return;
        }

        try {
            // Convert datetime-local to proper ISO without timezone shift issues
            const formattedStart = startDate + ":00";
            const formattedEnd = endDate + ":00";

            await api.post('/bookings/', {
                room_id: parseInt(roomId),
                start_date: formattedStart,
                end_date: formattedEnd
            });

            setStartDate('');
            setEndDate('');
            onBookingCreated();

        } catch (err: any) {
            const msg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                'Failed to create booking';

            setError(msg);
        }
    };

    return (
        <div className="booking-form">
            <h3>Book a Room</h3>
            {error && <p className="error">{error}</p>}
            {rooms.length === 0 ? (
                <p>No rooms available to book.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Room:</label>
                        <select
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        >
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>
                                    {room.name} (Cap: {room.capacity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Date & Time:</label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date & Time:</label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button type="submit">Book Room</button>
                </form>
            )}
        </div>
    );
}

export default CreateBooking;
