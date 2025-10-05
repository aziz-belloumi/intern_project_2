import { createAction, props } from '@ngrx/store';
import { Booking } from '../../models/booking.model';

export const loadUserBookings = createAction(
  '[Booking] Load User Bookings',
  props<{ userId: number; lastBookingId?: number }>()
);

export const loadUserBookingsSuccess = createAction(
  '[Booking] Load User Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadUserBookingsFailure = createAction(
  '[Booking] Load User Bookings Failure',
  props<{ error: any }>()
);

// --- Get Pending Bookings ---
export const loadPendingBookings = createAction(
  '[Booking] Load Pending Bookings',
  props<{ userId: number }>()
);

export const loadPendingBookingsSuccess = createAction(
  '[Booking] Load Pending Bookings Success',
  props<{ pendingBookings: Booking[] }>()
);

export const loadPendingBookingsFailure = createAction(
  '[Booking] Load Pending Bookings Failure',
  props<{ error: any }>()
);

// --- Confirm Booking Payment ---
export const confirmBookingPayment = createAction(
  '[Booking] Confirm Booking Payment',
  props<{ bookingId: number }>()
);

export const confirmBookingPaymentSuccess = createAction(
  '[Booking] Confirm Booking Payment Success',
  props<{ bookingId: number }>()
);

export const confirmBookingPaymentFailure = createAction(
  '[Booking] Confirm Booking Payment Failure',
  props<{ error: any }>()
);


export const loadUserRecentBookings = createAction(
  '[Booking] Load User Recent Bookings',
  props<{ userId: number }>()
);

export const loadUserRecentBookingsSuccess = createAction(
  '[Booking] Load User Recent Bookings Success',
  props<{ recentBookings: Booking[] }>()
);

export const loadUserRecentBookingsFailure = createAction(
  '[Booking] Load User Recent Bookings Failure',
  props<{ error: any }>()
);



export const loadUserStatistics = createAction(
  '[Booking] Load User Statistics',
  props<{ userId: number }>()
);

export const loadUserStatisticsSuccess = createAction(
  '[Booking] Load User Statistics Success',
  props<{ statistics: number[] }>()
);

export const loadUserStatisticsFailure = createAction(
  '[Booking] Load User Statistics Failure',
  props<{ error: any }>()
);
