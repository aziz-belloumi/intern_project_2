import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingService } from '../../services/booking.service';
import * as BookingActions from './booking.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class BookingEffects {
  constructor(private actions$: Actions, private bookingService: BookingService) {}

  loadUserBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadUserBookings),
      mergeMap(action =>
        this.bookingService.getUserBookings(action.userId , action.lastBookingId).pipe(
          map(bookings => BookingActions.loadUserBookingsSuccess({ bookings })),
          catchError(error => of(BookingActions.loadUserBookingsFailure({ error })))
        )
      )
    )
  );

  loadUserRecentBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadUserRecentBookings),
      mergeMap(action =>
        this.bookingService.getUserRecentBookings(action.userId).pipe(
          map(recentBookings => BookingActions.loadUserRecentBookingsSuccess({ recentBookings })),
          catchError(error => of(BookingActions.loadUserRecentBookingsFailure({ error })))
        )
      )
    )
  );

  loadUserStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadUserStatistics),
      mergeMap(action =>
        this.bookingService.getUserStatistics(action.userId).pipe(
          map(statistics => BookingActions.loadUserStatisticsSuccess({ statistics })),
          catchError(error => of(BookingActions.loadUserStatisticsFailure({ error })))
        )
      )
    )
  );

  loadPendingBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadPendingBookings),
      mergeMap(action =>
        this.bookingService.getPendingBookings(action.userId).pipe(
          map(pendingBookings => BookingActions.loadPendingBookingsSuccess({ pendingBookings })),
          catchError(error => of(BookingActions.loadPendingBookingsFailure({ error })))
        )
      )
    )
  );

  confirmBookingPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.confirmBookingPayment),
      mergeMap(action =>
        this.bookingService.confirmBookingPayment(action.bookingId).pipe(
          map(() => BookingActions.confirmBookingPaymentSuccess({ bookingId: action.bookingId })),
          catchError(error => of(BookingActions.confirmBookingPaymentFailure({ error })))
        )
      )
    )
  );

}
