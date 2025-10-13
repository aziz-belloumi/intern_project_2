import { createReducer, on } from '@ngrx/store';
import * as EquipmentBookingActions from './equipment-booking.actions';
import { initialState } from './equipment-booking.state';

export const equipmentBookingReducer = createReducer(
  initialState,

  // Load all bookings
  on(EquipmentBookingActions.loadAllBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.loadAllBookingsSuccess, (state, { bookings }) => ({
    ...state,
    allBookings: bookings,
    loading: false
  })),
  on(EquipmentBookingActions.loadAllBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load user bookings
  on(EquipmentBookingActions.loadUserBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.loadUserBookingsSuccess, (state, { bookings }) => ({
    ...state,
    userBookings: bookings,
    loading: false
  })),
  on(EquipmentBookingActions.loadUserBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load equipment bookings
  on(EquipmentBookingActions.loadEquipmentBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.loadEquipmentBookingsSuccess, (state, { bookings }) => ({
    ...state,
    equipmentBookings: bookings,
    loading: false
  })),
  on(EquipmentBookingActions.loadEquipmentBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load pending bookings
  on(EquipmentBookingActions.loadPendingBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.loadPendingBookingsSuccess, (state, { bookings }) => ({
    ...state,
    pendingBookings: bookings,
    loading: false
  })),
  on(EquipmentBookingActions.loadPendingBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load booking by id
  on(EquipmentBookingActions.loadBookingById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.loadBookingByIdSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    loading: false
  })),
  on(EquipmentBookingActions.loadBookingByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create booking
  on(EquipmentBookingActions.createBooking, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.createBookingSuccess, (state, { booking }) => ({
    ...state,
    allBookings: [...state.allBookings, booking],
    userBookings: [...state.userBookings, booking],
    loading: false
  })),
  on(EquipmentBookingActions.createBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update booking status
  on(EquipmentBookingActions.updateBookingStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.updateBookingStatusSuccess, (state, { booking }) => ({
    ...state,
    allBookings: state.allBookings.map(b => b.id === booking.id ? booking : b),
    userBookings: state.userBookings.map(b => b.id === booking.id ? booking : b),
    equipmentBookings: state.equipmentBookings.map(b => b.id === booking.id ? booking : b),
    pendingBookings: state.pendingBookings.filter(b => b.id !== booking.id),
    selectedBooking: state.selectedBooking?.id === booking.id ? booking : state.selectedBooking,
    loading: false
  })),
  on(EquipmentBookingActions.updateBookingStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Confirm booking
  on(EquipmentBookingActions.confirmBooking, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.confirmBookingSuccess, (state, { booking }) => ({
    ...state,
    allBookings: state.allBookings.map(b => b.id === booking.id ? booking : b),
    userBookings: state.userBookings.map(b => b.id === booking.id ? booking : b),
    equipmentBookings: state.equipmentBookings.map(b => b.id === booking.id ? booking : b),
    pendingBookings: state.pendingBookings.filter(b => b.id !== booking.id),
    selectedBooking: state.selectedBooking?.id === booking.id ? booking : state.selectedBooking,
    loading: false
  })),
  on(EquipmentBookingActions.confirmBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Cancel booking
  on(EquipmentBookingActions.cancelBooking, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.cancelBookingSuccess, (state, { booking }) => ({
    ...state,
    allBookings: state.allBookings.map(b => b.id === booking.id ? booking : b),
    userBookings: state.userBookings.map(b => b.id === booking.id ? booking : b),
    equipmentBookings: state.equipmentBookings.map(b => b.id === booking.id ? booking : b),
    pendingBookings: state.pendingBookings.filter(b => b.id !== booking.id),
    selectedBooking: state.selectedBooking?.id === booking.id ? booking : state.selectedBooking,
    loading: false
  })),
  on(EquipmentBookingActions.cancelBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete booking
  on(EquipmentBookingActions.deleteBooking, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.deleteBookingSuccess, (state, { id }) => ({
    ...state,
    allBookings: state.allBookings.filter(b => b.id !== id),
    userBookings: state.userBookings.filter(b => b.id !== id),
    equipmentBookings: state.equipmentBookings.filter(b => b.id !== id),
    pendingBookings: state.pendingBookings.filter(b => b.id !== id),
    selectedBooking: state.selectedBooking?.id === id ? null : state.selectedBooking,
    loading: false
  })),
  on(EquipmentBookingActions.deleteBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Search bookings
  on(EquipmentBookingActions.searchBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentBookingActions.searchBookingsSuccess, (state, { bookings }) => ({
    ...state,
    allBookings: bookings,
    loading: false
  })),
  on(EquipmentBookingActions.searchBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear selected booking
  on(EquipmentBookingActions.clearSelectedBooking, state => ({
    ...state,
    selectedBooking: null
  }))
);
