import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import {initialState} from "./room.state";

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.loadRooms, (state) => ({ ...state, loading: true })),
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({ ...state,error: null, rooms, loading: false })),

  on(RoomActions.loadRoom, (state) => ({ ...state, loading: true })),
  on(RoomActions.loadRoomSuccess, (state, { room }) => ({ ...state,error: null, selectedRoom: room, loading: false })),

  on(RoomActions.createRoom, (state) => ({ ...state, loading: true })),
  on(RoomActions.createRoomSuccess, (state, { room }) => ({ ...state,error: null, rooms: [...state.rooms, room],loading: false })),

  on(RoomActions.updateRoom, (state) => ({ ...state, loading: true })),
  on(RoomActions.updateRoomSuccess, (state, { room }) => ({...state, loading: false ,error: null,rooms: state.rooms.map(r => r.id === room.id ? room : r) ,selectedRoom: state.selectedRoom?.id === room.id ? room : state.selectedRoom })),

  on(RoomActions.deleteRoom, (state) => ({ ...state, loading: true })),
  on(RoomActions.deleteRoomSuccess, (state, { id }) => ({...state,loading: false , error: null, rooms: state.rooms.filter(r => r.id !== id), selectedRoom: state.selectedRoom?.id === id ? null : state.selectedRoom})),

  on(
    RoomActions.loadRoomsFailure,
    RoomActions.loadRoomFailure,
    RoomActions.createRoomFailure,
    RoomActions.updateRoomFailure,
    RoomActions.deleteRoomFailure,
    (state, { error }) => ({ ...state, error , loading: false })
  )
);
