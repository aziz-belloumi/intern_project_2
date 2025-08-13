import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from './room.state';


export const selectRoomState = createFeatureSelector<RoomState>('room');


export const selectAllRooms = createSelector(
  selectRoomState,
  (state) => state.rooms
);

export const selectRoomsLoading = createSelector(
  selectRoomState,
  (state) => state.loading
);

export const selectRoomsError = createSelector(
  selectRoomState,
  (state) => state.error
);


export const selectRoomById = (id: number) => createSelector(
  selectAllRooms,
  (rooms) => rooms.find(room => room.id === id)
);
