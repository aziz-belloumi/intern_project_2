import {Room} from "../../models/room.model";

export interface RoomState {
  rooms: Room[];
  userRooms: Room[];
  filteredRooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: any;
}

export const initialState: RoomState = {
  rooms: [],
  userRooms: [],
  filteredRooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};
