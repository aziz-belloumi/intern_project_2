import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../../models/user.model";
import { selectUser } from "../../state/auth/auth.selectors";
import { Store } from '@ngrx/store';
import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as BookingActions from "../../state/booking/booking.actions";
import * as BookingSelectors from "../../state/booking/booking.selectors";
import { Booking, BookingStatus } from "../../models/booking.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  preferredRoomIds: number[] = [];
  bookingHistory: Booking[] = [];
  bookingStats: number[] = [];
  recentBooking: Booking[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit() {
    // Subscribe to user data
    this.store.select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (user?.PreferredRoomIds && user.PreferredRoomIds.trim().length > 0) {
          this.preferredRoomIds = user.PreferredRoomIds
            .split(',')
            .map((id: string) => Number(id.trim()))
            .filter((id: number) => !isNaN(id));
        } else {
          this.preferredRoomIds = [];
        }
      });

    // Select booking history from store
    this.store.select(BookingSelectors.selectBookings)
      .pipe(takeUntil(this.destroy$), filter(history => history.length > 0))
      .subscribe(history => this.bookingHistory = history);

    // Select booking stats from store
    this.store.select(BookingSelectors.selectBookingStatistics)
      .pipe(takeUntil(this.destroy$), filter(stats => stats.length > 0))
      .subscribe(stats => this.bookingStats = stats);

    // Select recent booking from store
    this.store.select(BookingSelectors.selectRecentBookings)
      .pipe(takeUntil(this.destroy$), filter(recentBooking => recentBooking.length > 0))
      .subscribe(recentBooking => this.recentBooking = recentBooking);
  }

  loadMoreBookings() {
    if (!this.bookingHistory.length) return;
    const lastBookingId = this.bookingHistory[this.bookingHistory.length - 1].id;
    this.store.dispatch(
      BookingActions.loadUserBookings({ userId: this.user!.id, lastBookingId })
    );
  }

  // Helper method to convert booking status enum to display string
  getBookingStatusDisplay(status?: BookingStatus): string {
    if (status === undefined || status === null) return 'Unknown';
    const statusMap: { [key: number]: string } = {
      [BookingStatus.Pending]: 'Pending',
      [BookingStatus.Confirmed]: 'Confirmed',
      [BookingStatus.Cancelled]: 'Cancelled',
      [BookingStatus.Completed]: 'Completed'
    };
    return statusMap[status] || 'Unknown';
  }

  // Helper method to get status CSS class
  getBookingStatusClass(status?: BookingStatus): string {
    if (status === undefined || status === null) return 'status-pending';
    const classMap: { [key: number]: string } = {
      [BookingStatus.Pending]: 'status-pending',
      [BookingStatus.Confirmed]: 'status-confirmed',
      [BookingStatus.Cancelled]: 'status-cancelled',
      [BookingStatus.Completed]: 'status-completed'
    };
    return classMap[status] || 'status-pending';
  }

  // Helper method to format date
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
