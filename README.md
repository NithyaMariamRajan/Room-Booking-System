# Room Booking System

A simple full-stack room booking system built with Flask (Backend) and React (Frontend).

## Tech Stack

- **Backend**: Python, Flask, SQLAlchemy, Marshmallow
- **Frontend**: React, Vite, Axios
- **Database**: SQLite
- **Testing**: Pytest

## Architecture Decisions

- **Layered Architecture**:
  - **Routes**: Handle HTTP requests/responses and input parsing.
  - **Services**: Contain all business logic (validation, database operations). This ensures separation of concerns and makes logic testable independent of HTTP context.
  - **Models**: Define Database schema (SQLAlchemy).
  - **Schemas**: Handle data validation and serialization (Marshmallow).
- **Validation**:
  - Input structure validation is done via Marshmallow schemas.
  - Business rules (e.g., overlapping bookings) are validated in the Service layer.
- **Error Handling**:
  - API returns standard JSON error responses.

## Setup & Running

### Backend
1. Navigate to the root directory.
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the application:
   ```bash
   python backend/app.py
   ```
   Server runs on `http://localhost:5000`.

### Frontend
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Running Tests
To run the backend unit tests:
```bash
pytest backend/tests
```
