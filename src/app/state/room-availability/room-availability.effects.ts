import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingService } from '../../services/booking.service';
import * as RoomActions from './room-availability.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RoomAvailabilityEffects {
  loadRoomAvailability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRoomAvailability),
      mergeMap(action =>
        this.bookingService.getAllRoomsAvailability(action.endTime).pipe(
          map(response => RoomActions.loadRoomAvailabilitySuccess({ rooms: response.rooms })),
          catchError(error => of(RoomActions.loadRoomAvailabilityFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}
}
