import { createReducer, on } from '@ngrx/store';
import * as BookingActions from './booking.actions';
import {initialState} from "./booking.state";



export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.loadUserBookings, state => ({ ...state, loading: true })),
  on(BookingActions.loadUserBookingsSuccess, (state, { bookings }) => ({ ...state, bookings:[...state.bookings, ...bookings.filter(b => !state.bookings.some(existing => existing.id === b.id))], loading: false })),
  on(BookingActions.loadUserBookingsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(BookingActions.loadUserRecentBookings, state => ({ ...state, loading: true })),
  on(BookingActions.loadUserRecentBookingsSuccess, (state, { recentBookings }) => ({ ...state, recentBookings: recentBookings, loading: false })),
  on(BookingActions.loadUserRecentBookingsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(BookingActions.loadUserStatistics, state => ({ ...state, loading: true })),
  on(BookingActions.loadUserStatisticsSuccess, (state, { statistics }) => ({ ...state, statistics, loading: false })),
  on(BookingActions.loadUserStatisticsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
