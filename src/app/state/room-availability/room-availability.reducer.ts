import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room-availability.actions';
import {initialState} from "./room-availability.state";

export const roomAvailabilityReducer = createReducer(
  initialState,
  on(RoomActions.loadRoomAvailability, state => ({ ...state, loading: true, error: null })),
  on(RoomActions.loadRoomAvailabilitySuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    loading: false
  })),
  on(RoomActions.loadRoomAvailabilityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
