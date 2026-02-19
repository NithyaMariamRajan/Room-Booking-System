import { useState } from 'react';
import api from '../api';

interface Props {
  onRoomCreated: () => void;
}

function CreateRoom({ onRoomCreated }: Props) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/rooms/', {
        name,
        capacity: Number(capacity),
      });

      setName('');
      setCapacity('');
      onRoomCreated();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="create-room-card">
      <h3>Create New Room</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Name:</label>
          <input
            type="text"
            placeholder="e.g. Conference Room A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Capacity:</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
