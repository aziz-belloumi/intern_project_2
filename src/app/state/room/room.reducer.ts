// src/app/state/room/room.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import { initialState } from './room.state';

export const roomReducer = createReducer(
  initialState,

  // load all rooms
  on(RoomActions.loadRooms, state => ({ ...state, loading: true })),
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({ ...state, rooms, loading: false, error: null })),
  on(RoomActions.loadRoomsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // load single room
  on(RoomActions.loadRoom, state => ({ ...state, loading: true })),
  on(RoomActions.loadRoomSuccess, (state, { room }) => ({ ...state, selectedRoom: room, loading: false, error: null })),
  on(RoomActions.loadRoomFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // load user rooms -> store into userRooms (NOT replacing the global rooms list)
  on(RoomActions.loadUserRooms, state => ({ ...state, loading: true })),
  on(RoomActions.loadUserRoomsSuccess, (state, { rooms }) => ({ ...state, userRooms: rooms, loading: false, error: null })),
  on(RoomActions.loadUserRoomsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // create
  on(RoomActions.createRoom, state => ({ ...state, loading: true })),
  on(RoomActions.createRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room],
    loading: false,
    error: null,
  })),
  on(RoomActions.createRoomFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // update
  on(RoomActions.updateRoom, state => ({ ...state, loading: true })),
  on(RoomActions.updateRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: state.rooms.map(r => (r.id === room.id ? room : r)),
    selectedRoom: state.selectedRoom?.id === room.id ? room : state.selectedRoom,
    // optionally update userRooms if present
    userRooms: state.userRooms.map(r => (r.id === room.id ? room : r)),
    loading: false,
    error: null,
  })),
  on(RoomActions.updateRoomFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // delete
  on(RoomActions.deleteRoom, state => ({ ...state, loading: true })),
  on(RoomActions.deleteRoomSuccess, (state, { id }) => ({
    ...state,
    rooms: state.rooms.filter(r => r.id !== id),
    userRooms: state.userRooms.filter(r => r.id !== id),
    selectedRoom: state.selectedRoom?.id === id ? null : state.selectedRoom,
    loading: false,
    error: null,
  })),
  on(RoomActions.deleteRoomFailure, (state, { error }) => ({ ...state, loading: false, error })),
  // Update the existing loadRoomsSuccess handler
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    filteredRooms: rooms,  // Initially, filtered = all rooms
    loading: false,
    error: null
  })),

// Update search handlers
  on(RoomActions.searchRooms, state => ({ ...state, loading: true })),
  on(RoomActions.searchRoomsSuccess, (state, { rooms }) => ({
    ...state,
    filteredRooms: rooms,  // Only update filteredRooms, keep original rooms intact
    loading: false,
    error: null
  })),
  on(RoomActions.searchRoomsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


);
