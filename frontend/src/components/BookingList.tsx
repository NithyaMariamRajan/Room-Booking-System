import { useState, useEffect } from 'react';
import api from '../api';
import CreateBooking from './CreateBooking';
import { Booking } from '../types';

function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [filter, setFilter] = useState<string>("All");

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await api.get('/bookings/');
            setBookings(response.data);
        } catch (err) {
            setError("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    const deleteBooking = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/bookings/${id}`);
            fetchBookings();
        } catch {
            setError("Failed to delete booking");
        }
    };

    const getStatus = (start: string, end: string) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (now < startDate) return "Upcoming";
        if (now > endDate) return "Completed";
        return "Ongoing";
    };

    const filteredBookings = bookings.filter((booking) => {
        if (filter === "All") return true;
        return getStatus(booking.start_date, booking.end_date) === filter;
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="booking-container">
            <h2>Bookings</h2>

            {error && <p className="error">{error}</p>}

            {/* SINGLE WHITE BOX (CREATE + FILTER) */}
            <div className="booking-card">
                <CreateBooking onBookingCreated={fetchBookings} />

                <div className="filter-section">
                    <label>Filter by Status:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* BOOKINGS */}
            {loading ? (
                <p style={{ marginTop: "20px" }}>Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
                <p style={{ marginTop: "20px" }}>No bookings found.</p>
            ) : (
                <div className="booking-list">
                    {filteredBookings.map((booking) => {
                        const status = getStatus(booking.start_date, booking.end_date);

                        return (
                            <div key={booking.id} className="card">
                                <p><strong>Booking ID:</strong> {booking.id}</p>
                                <p><strong>Room:</strong> {booking.room_name}</p>
                                <p><strong>Start:</strong> {new Date(booking.start_date).toLocaleString()}</p>
                                <p><strong>End:</strong> {new Date(booking.end_date).toLocaleString()}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status ${status.toLowerCase()}`}>
                                        {status}
                                    </span>
                                </p>

                                <button
                                    className="delete"
                                    onClick={() => deleteBooking(booking.id)}
                                >
                                    Delete Booking
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BookingList;
