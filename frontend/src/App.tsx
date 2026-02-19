import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RoomList from './components/RoomList';
import BookingList from './components/BookingList';
import Login from './components/Login';
import './App.css';

/* =========================================
   Layout Component
========================================= */

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  /* ---------- LOGIN PAGE LAYOUT ---------- */
  if (isLoginPage) {
    return (
      <div className="login-page">
        <Login />
      </div>
    );
  }

  /* ---------- MAIN APP LAYOUT ---------- */
  return (
    <div className="app-wrapper">

      {/* Navbar */}
      <nav>
        <h1>Room Booking System</h1>

        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/login" style={{ color: "#ff6b6b" }}>Logout</Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/bookings" element={<BookingList />} />
        </Routes>
      </div>

    </div>
  );
}

/* =========================================
   App Entry
========================================= */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Layout />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
