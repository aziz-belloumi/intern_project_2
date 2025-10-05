import { createFeatureSelector, createSelector } from '@ngrx/store';
import {BookingState} from "./booking.state";


export const selectBookingState = createFeatureSelector<BookingState>('booking');

export const selectBookings = createSelector(
  selectBookingState,
  (state) => state.bookings
);

export const selectRecentBookings = createSelector(
  selectBookingState,
  (state) => state.recentBookings
);

export const selectBookingStatistics = createSelector(
  selectBookingState,
  (state) => state.statistics
);

export const selectPendingBookings = createSelector(
  selectBookingState,
  (state) => state.pendingBookings
);

export const selectBookingLoading = createSelector(
  selectBookingState,
  (state) => state.loading
);

export const selectBookingError = createSelector(
  selectBookingState,
  (state) => state.error
);
