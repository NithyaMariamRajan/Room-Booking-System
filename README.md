# Room Booking System

A full-stack Room Booking System built using FastAPI (Backend) and React + TypeScript (Frontend).

The system allows users to create rooms, book rooms for specific time ranges, manage bookings, and automatically track booking status (Upcoming / Ongoing / Completed).

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

## Architecture Overview

### Backend – Layered Structure

The backend follows a clean layered architecture:

**Routes (API Layer)**  
Handles HTTP requests and response formatting.

**Services (Business Logic Layer)**  
Contains all core business logic:
- Booking validation
- Preventing overlapping bookings
- Preventing invalid date ranges
- Status calculation
- Room deletion safeguards

This separation ensures better maintainability, readability, and testability.

**Models (SQLAlchemy)**  
Define database schema and relationships.

**Schemas (Pydantic)**  
Handle input validation and response serialization.

---

## Booking Status Logic

Booking status is calculated dynamically based on the current time:

- If current time < start time → Upcoming  
- If current time > end time → Completed  
- Otherwise → Ongoing  

This avoids storing redundant state in the database.

---

## Features

- Create and delete rooms
- Prevent deleting rooms with future bookings
- Create bookings with start & end date/time
- Prevent overlapping bookings
- Prevent booking in the past
- Automatic booking status detection
- Filter bookings by status
- Dashboard with statistics
- Clean and responsive UI
- Basic login screen (UI-level authentication)

---
## Setup & Running

### Backend

1. Navigate to project root

2. Create virtual environment:

python -m venv .venv


3. Activate (Windows):

.venv\Scripts\activate


4. Install dependencies:

pip install -r requirements.txt


5. Run server:

uvicorn backend.main:app --reload


Backend runs at:
http://127.0.0.1:8000


---

### Frontend

1. Navigate to frontend:

cd frontend


2. Install dependencies:

npm install


3. Run development server:

npm run dev


Frontend runs at:
http://localhost:5173


---

## Build for Production

To generate frontend production build:

npm run build


---

## Testing

If backend tests are included:

pytest



## Author

Built as a full-stack assessment project demonstrating backend architecture, validation logic, and frontend in
