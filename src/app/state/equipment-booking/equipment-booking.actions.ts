import { createAction, props } from '@ngrx/store';
import { EquipmentBooking, EquipmentBookingStatus } from '../../models/equipment-booking.model';
import { EquipmentBookingSearchParams } from '../../services/equipment-booking.service';

// Load all bookings
export const loadAllBookings = createAction('[Equipment Booking] Load All Bookings');
export const loadAllBookingsSuccess = createAction(
  '[Equipment Booking] Load All Bookings Success',
  props<{ bookings: EquipmentBooking[] }>()
);
export const loadAllBookingsFailure = createAction(
  '[Equipment Booking] Load All Bookings Failure',
  props<{ error: any }>()
);

// Load user bookings
export const loadUserBookings = createAction(
  '[Equipment Booking] Load User Bookings',
  props<{ userId: number }>()
);
export const loadUserBookingsSuccess = createAction(
  '[Equipment Booking] Load User Bookings Success',
  props<{ bookings: EquipmentBooking[] }>()
);
export const loadUserBookingsFailure = createAction(
  '[Equipment Booking] Load User Bookings Failure',
  props<{ error: any }>()
);

// Load equipment bookings
export const loadEquipmentBookings = createAction(
  '[Equipment Booking] Load Equipment Bookings',
  props<{ equipmentId: number }>()
);
export const loadEquipmentBookingsSuccess = createAction(
  '[Equipment Booking] Load Equipment Bookings Success',
  props<{ bookings: EquipmentBooking[] }>()
);
export const loadEquipmentBookingsFailure = createAction(
  '[Equipment Booking] Load Equipment Bookings Failure',
  props<{ error: any }>()
);

// Load pending bookings
export const loadPendingBookings = createAction(
  '[Equipment Booking] Load Pending Bookings',
  props<{ userId: number }>()
);
export const loadPendingBookingsSuccess = createAction(
  '[Equipment Booking] Load Pending Bookings Success',
  props<{ bookings: EquipmentBooking[] }>()
);
export const loadPendingBookingsFailure = createAction(
  '[Equipment Booking] Load Pending Bookings Failure',
  props<{ error: any }>()
);

// Load single booking
export const loadBookingById = createAction(
  '[Equipment Booking] Load Booking By Id',
  props<{ id: number }>()
);
export const loadBookingByIdSuccess = createAction(
  '[Equipment Booking] Load Booking By Id Success',
  props<{ booking: EquipmentBooking }>()
);
export const loadBookingByIdFailure = createAction(
  '[Equipment Booking] Load Booking By Id Failure',
  props<{ error: any }>()
);

// Create booking
export const createBooking = createAction(
  '[Equipment Booking] Create Booking',
  props<{ booking: EquipmentBooking }>()
);
export const createBookingSuccess = createAction(
  '[Equipment Booking] Create Booking Success',
  props<{ booking: EquipmentBooking }>()
);
export const createBookingFailure = createAction(
  '[Equipment Booking] Create Booking Failure',
  props<{ error: any }>()
);

// Update booking status
export const updateBookingStatus = createAction(
  '[Equipment Booking] Update Booking Status',
  props<{ bookingId: number; status: EquipmentBookingStatus }>()
);
export const updateBookingStatusSuccess = createAction(
  '[Equipment Booking] Update Booking Status Success',
  props<{ booking: EquipmentBooking }>()
);
export const updateBookingStatusFailure = createAction(
  '[Equipment Booking] Update Booking Status Failure',
  props<{ error: any }>()
);

// Confirm booking
export const confirmBooking = createAction(
  '[Equipment Booking] Confirm Booking',
  props<{ bookingId: number }>()
);
export const confirmBookingSuccess = createAction(
  '[Equipment Booking] Confirm Booking Success',
  props<{ booking: EquipmentBooking }>()
);
export const confirmBookingFailure = createAction(
  '[Equipment Booking] Confirm Booking Failure',
  props<{ error: any }>()
);

// Cancel booking
export const cancelBooking = createAction(
  '[Equipment Booking] Cancel Booking',
  props<{ bookingId: number }>()
);
export const cancelBookingSuccess = createAction(
  '[Equipment Booking] Cancel Booking Success',
  props<{ booking: EquipmentBooking }>()
);
export const cancelBookingFailure = createAction(
  '[Equipment Booking] Cancel Booking Failure',
  props<{ error: any }>()
);

// Delete booking
export const deleteBooking = createAction(
  '[Equipment Booking] Delete Booking',
  props<{ id: number }>()
);
export const deleteBookingSuccess = createAction(
  '[Equipment Booking] Delete Booking Success',
  props<{ id: number }>()
);
export const deleteBookingFailure = createAction(
  '[Equipment Booking] Delete Booking Failure',
  props<{ error: any }>()
);

// Search bookings
export const searchBookings = createAction(
  '[Equipment Booking] Search Bookings',
  props<{ params: EquipmentBookingSearchParams }>()
);
export const searchBookingsSuccess = createAction(
  '[Equipment Booking] Search Bookings Success',
  props<{ bookings: EquipmentBooking[] }>()
);
export const searchBookingsFailure = createAction(
  '[Equipment Booking] Search Bookings Failure',
  props<{ error: any }>()
);

// Clear selected booking
export const clearSelectedBooking = createAction('[Equipment Booking] Clear Selected Booking');
