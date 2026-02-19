import { useEffect, useState } from 'react';
import api from '../api';
import { Booking } from '../types';

function Dashboard() {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [upcoming, setUpcoming] = useState<number>(0);
  const [ongoing, setOngoing] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getStatus = (start: string, end: string) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now < startDate) return "Upcoming";
    if (now > endDate) return "Completed";
    return "Ongoing";
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const roomsRes = await api.get('/rooms/');
        const bookingsRes = await api.get('/bookings/');

        setRoomCount(roomsRes.data.length);
        setBookingCount(bookingsRes.data.length);

        const bookings: Booking[] = bookingsRes.data;

        let u = 0, o = 0, c = 0;

        bookings.forEach((b) => {
          const status = getStatus(b.start_date, b.end_date);
          if (status === "Upcoming") u++;
          else if (status === "Ongoing") o++;
          else c++;
        });

        setUpcoming(u);
        setOngoing(o);
        setCompleted(c);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {loading ? (
        <div style={{ marginTop: "20px" }}>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <div className="dashboard-grid">

          <div className="card">
            <h3>Total Rooms</h3>
            <p>{roomCount}</p>
          </div>

          <div className="card">
            <h3>Total Bookings</h3>
            <p>{bookingCount}</p>
          </div>

          <div className="card">
            <h3>Upcoming</h3>
            <p>{upcoming}</p>
          </div>

          <div className="card">
            <h3>Ongoing</h3>
            <p>{ongoing}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Dashboard;
