import {Room} from "../../models/room.model";

export interface RoomState {
  rooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: any;
}

export const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};
