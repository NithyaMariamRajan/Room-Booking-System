// Room type
export interface Room {
    id: number;
    name: string;
    capacity: number;
}

// Booking type
export interface Booking {
    id: number;
    room_id: number;
    room_name: string;   // comes from backend join
    start_date: string;  // ISO string from backend
    end_date: string;    // ISO string from backend
}
