import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingService } from '../../services/booking.service';
import * as RoomAvailabilityActions from './room-availability.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {of, tap} from 'rxjs';

@Injectable()
export class RoomAvailabilityEffects {
  loadRoomAvailability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAvailabilityActions.loadRoomAvailability),
      mergeMap(action =>
        this.bookingService.getAllRoomsAvailability(action.startTime,action.endTime).pipe(
          tap(response => console.log("********************************* Backend response: ", response)),
          map(response => RoomAvailabilityActions.loadRoomAvailabilitySuccess({ rooms: response.rooms })),
          catchError(error => of(RoomAvailabilityActions.loadRoomAvailabilityFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private bookingService: BookingService){}
}
