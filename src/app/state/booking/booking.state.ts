import {Booking} from "../../models/booking.model";

export interface BookingState {
  bookings: Booking[];
  lastBookingId: number | null;
  recentBookings: Booking[];
  statistics: number[];
  loading: boolean;
  error: any;
}

export const initialState: BookingState = {
  bookings: [],
  lastBookingId: null,
  recentBookings: [],
  statistics: [],
  loading: false,
  error: null
};
