import { createAction, props } from '@ngrx/store';
import {Room} from "../../models/room.model";

// load all rooms
export const loadRooms = createAction(
  '[Room] Load Rooms'
);
export const loadRoomsSuccess = createAction(
  '[Room] Load Rooms Success',
  props<{ rooms: Room[] }>()
);
export const loadRoomsFailure = createAction(
  '[Room] Load Rooms Failure',
  props<{ error: any }>()
);


// load a specific room
export const loadRoom = createAction(
  '[Room] Load Room',
  props<{ id: number }>()
);
export const loadRoomSuccess = createAction(
  '[Room] Load Room Success',
  props<{ room: Room }>()
);
export const loadRoomFailure = createAction(
  '[Room] Load Room Failure',
  props<{ error: any }>()
);


// create a room
export const createRoom = createAction(
  '[Room] Add Room',
  props<{ room: Partial<Room> }>()
);
export const createRoomSuccess = createAction(
  '[Room] Add Room Success',
  props<{ room: Room }>()
);
export const createRoomFailure = createAction(
  '[Room] Add Room Failure',
  props<{ error: any }>()
);


// update room features
export const updateRoom = createAction(
  '[Room] Update Room',
  props<{ id: number; room: Partial<Room> }>()
);
export const updateRoomSuccess = createAction(
  '[Room] Update Room Success',
  props<{ room: Room }>()
);
export const updateRoomFailure = createAction(
  '[Room] Update Room Failure',
  props<{ error: any }>()
);


//delete a room
export const deleteRoom = createAction(
  '[Room] Delete Room', props<{ id: number }>()
);
export const deleteRoomSuccess = createAction(
  '[Room] Delete Room Success',
  props<{ id: number }>()
);
export const deleteRoomFailure = createAction(
  '[Room] Delete Room Failure',
  props<{ error: any }>()
);
