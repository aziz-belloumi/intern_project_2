export interface RoomAvailabilityState {
  rooms: any[];
  loading: boolean;
  error: any;
}

export const initialState: RoomAvailabilityState = {
  rooms: [],
  loading: false,
  error: null
};
