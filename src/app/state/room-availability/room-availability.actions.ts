import { createAction, props } from '@ngrx/store';

export const loadRoomAvailability = createAction(
  '[Room] Load Room Availability',
  props<{ startTime?: string,endTime?: string }>() // optional endTime ISO string
);

export const loadRoomAvailabilitySuccess = createAction(
  '[Room] Load Room Availability Success',
  props<{ rooms: any[] }>() // list of room objects returned from API
);

export const loadRoomAvailabilityFailure = createAction(
  '[Room] Load Room Availability Failure',
  props<{ error: any }>()
);
