import {Booking} from "../../models/booking.model";

export interface BookingState {
  bookings: Booking[];
  lastBookingId: number | null;
  recentBookings: Booking[];
  statistics: number[];
  pendingBookings: Booking[];
  loading: boolean;
  error: any;
}

export const initialState: BookingState = {
  bookings: [],
  lastBookingId: null,
  recentBookings: [],
  statistics: [],
  pendingBookings: [],
  loading: false,
  error: null
};
