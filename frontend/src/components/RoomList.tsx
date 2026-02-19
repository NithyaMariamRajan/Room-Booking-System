import { useState, useEffect } from 'react';
import api from '../api';
import CreateRoom from './CreateRoom';
import { Room } from '../types';

function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<string>('');

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/rooms/${id}`);
      setMessage('Room deleted successfully');
      fetchRooms();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to delete room');
      }
    }
  };

  return (
    <div className="room-page">
      <h2 className="page-title">Rooms</h2>

      {message && <p className="success">{message}</p>}

      {/* Create Room Section */}
      <div className="create-room-wrapper">
        <CreateRoom onRoomCreated={fetchRooms} />
      </div>

      {/* Room Cards */}
      <div className="room-list">
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="card room-card">
              <h3>{room.name}</h3>
              <p>Capacity: {room.capacity}</p>
              <button
                className="delete"
                onClick={() => handleDelete(room.id)}
              >
                Delete Room
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoomList;
