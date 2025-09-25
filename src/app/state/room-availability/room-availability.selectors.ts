import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomAvailabilityState } from './room-availability.state';

export const selectRoomAvailabilityState = createFeatureSelector<RoomAvailabilityState>('roomAvailability');

export const selectAllRooms = createSelector(
  selectRoomAvailabilityState,
  state => state.rooms
);

export const selectLoading = createSelector(
  selectRoomAvailabilityState,
  state => state.loading
);

export const selectError = createSelector(
  selectRoomAvailabilityState,
  state => state.error
);
