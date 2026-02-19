# Room Booking System
A full-stack Room Booking System built using FastAPI (Backend) and React + TypeScript (Frontend).

The system allows users to create rooms, book rooms for specific time ranges, and manage bookings with automatic status tracking.

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite

### Frontend
- React
- TypeScript
- Vite
- Axios

### Database
- SQLite

---

## Architecture Decisions

### Backend – Layered Structure

The backend follows a clean layered architecture:

- **Routes (API Layer)**  
  Handles HTTP requests and responses.

- **Services (Business Logic Layer)**  
  Contains all business logic such as:
  - Booking validation
  - Overlap prevention
  - Status calculation
  - Room & booking operations  

  This ensures separation of concerns and makes the logic easier to test and maintain.

- **Models (SQLAlchemy)**  
  Define database tables and relationships.

- **Schemas (Pydantic)**  
  Handle request validation and response serialization.

---

## Booking Status Logic

Booking status is calculated dynamically based on the current time:

- If current time < start time → **Upcoming**
- If current time > end time → **Completed**
- Otherwise → **Ongoing**

This avoids storing redundant status fields in the database.

---

## Features

- Create and delete rooms
- Book rooms with start and end date/time
- Prevent invalid booking ranges
- Automatic booking status detection
- Filter bookings by status
- Dashboard with room and booking statistics
- Clean, responsive UI

---

## Setup & Running

### Backend

1. Navigate to project root
2. Create virtual environment:

python -m venv .venv

3. Activate:

Windows:

.venv\Scripts\activate

4. Install dependencies:

pip install -r requirements.txt

5. Run server:

uvicorn backend.main:app --reload

Backend runs at:
http://127.0.0.1:8000

### Frontend

1. Navigate to frontend:
cd frontend
2. Install dependencies:
npm install
3. Run development server:
npm run dev
Frontend runs at:
http://localhost:5173

## Build for Production

To generate frontend production build:
npm run build

---
## Testing
If backend tests are included:
pytest
