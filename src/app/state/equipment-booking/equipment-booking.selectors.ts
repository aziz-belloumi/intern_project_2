import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EquipmentBookingState } from './equipment-booking.state';

export const selectEquipmentBookingState = createFeatureSelector<EquipmentBookingState>('equipmentBooking');

export const selectAllBookings = createSelector(
  selectEquipmentBookingState,
  state => state.allBookings
);

export const selectUserBookings = createSelector(
  selectEquipmentBookingState,
  state => state.userBookings
);

export const selectEquipmentBookings = createSelector(
  selectEquipmentBookingState,
  state => state.equipmentBookings
);

export const selectPendingBookings = createSelector(
  selectEquipmentBookingState,
  state => state.pendingBookings
);

export const selectSelectedBooking = createSelector(
  selectEquipmentBookingState,
  state => state.selectedBooking
);

export const selectBookingLoading = createSelector(
  selectEquipmentBookingState,
  state => state.loading
);

export const selectBookingError = createSelector(
  selectEquipmentBookingState,
  state => state.error
);
