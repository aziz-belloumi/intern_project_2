import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentBookingService } from '../../services/equipment-booking.service';
import * as EquipmentBookingActions from './equipment-booking.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EquipmentBookingEffects {
  loadAllBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.loadAllBookings),
      mergeMap(() =>
        this.equipmentBookingService.getAllBookings().pipe(
          map(bookings => EquipmentBookingActions.loadAllBookingsSuccess({ bookings })),
          catchError(error => of(EquipmentBookingActions.loadAllBookingsFailure({ error })))
        )
      )
    )
  );

  loadUserBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.loadUserBookings),
      mergeMap(({ userId }) =>
        this.equipmentBookingService.getUserBookings(userId).pipe(
          map(bookings => EquipmentBookingActions.loadUserBookingsSuccess({ bookings })),
          catchError(error => of(EquipmentBookingActions.loadUserBookingsFailure({ error })))
        )
      )
    )
  );

  loadEquipmentBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.loadEquipmentBookings),
      mergeMap(({ equipmentId }) =>
        this.equipmentBookingService.getEquipmentBookings(equipmentId).pipe(
          map(bookings => EquipmentBookingActions.loadEquipmentBookingsSuccess({ bookings })),
          catchError(error => of(EquipmentBookingActions.loadEquipmentBookingsFailure({ error })))
        )
      )
    )
  );

  loadPendingBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.loadPendingBookings),
      mergeMap(({ userId }) =>
        this.equipmentBookingService.getPendingBookings(userId).pipe(
          map(bookings => EquipmentBookingActions.loadPendingBookingsSuccess({ bookings })),
          catchError(error => of(EquipmentBookingActions.loadPendingBookingsFailure({ error })))
        )
      )
    )
  );

  loadBookingById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.loadBookingById),
      mergeMap(({ id }) =>
        this.equipmentBookingService.getBookingById(id).pipe(
          map(booking => EquipmentBookingActions.loadBookingByIdSuccess({ booking })),
          catchError(error => of(EquipmentBookingActions.loadBookingByIdFailure({ error })))
        )
      )
    )
  );

  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.createBooking),
      mergeMap(({ booking }) =>
        this.equipmentBookingService.createBooking(booking).pipe(
          map(created => EquipmentBookingActions.createBookingSuccess({ booking: created })),
          catchError(error => of(EquipmentBookingActions.createBookingFailure({ error })))
        )
      )
    )
  );

  updateBookingStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.updateBookingStatus),
      mergeMap(({ bookingId, status }) =>
        this.equipmentBookingService.updateBookingStatus(bookingId, status).pipe(
          map(booking => EquipmentBookingActions.updateBookingStatusSuccess({ booking })),
          catchError(error => of(EquipmentBookingActions.updateBookingStatusFailure({ error })))
        )
      )
    )
  );

  confirmBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.confirmBooking),
      mergeMap(({ bookingId }) =>
        this.equipmentBookingService.confirmBooking(bookingId).pipe(
          map(booking => EquipmentBookingActions.confirmBookingSuccess({ booking })),
          catchError(error => of(EquipmentBookingActions.confirmBookingFailure({ error })))
        )
      )
    )
  );

  cancelBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.cancelBooking),
      mergeMap(({ bookingId }) =>
        this.equipmentBookingService.cancelBooking(bookingId).pipe(
          map(booking => EquipmentBookingActions.cancelBookingSuccess({ booking })),
          catchError(error => of(EquipmentBookingActions.cancelBookingFailure({ error })))
        )
      )
    )
  );

  deleteBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.deleteBooking),
      mergeMap(({ id }) =>
        this.equipmentBookingService.deleteBooking(id).pipe(
          map(() => EquipmentBookingActions.deleteBookingSuccess({ id })),
          catchError(error => of(EquipmentBookingActions.deleteBookingFailure({ error })))
        )
      )
    )
  );

  searchBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentBookingActions.searchBookings),
      mergeMap(({ params }) =>
        this.equipmentBookingService.searchBookings(params).pipe(
          map(bookings => EquipmentBookingActions.searchBookingsSuccess({ bookings })),
          catchError(error => of(EquipmentBookingActions.searchBookingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private equipmentBookingService: EquipmentBookingService
  ) {}
}
