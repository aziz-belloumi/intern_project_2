import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceOverviewCardsComponent} from "./resource-overview-cards/resource-overview-cards.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ResourceTableComponent} from "./resource-table/resource-table.component";
import * as RoomActions from "../../state/room/room.actions";
import * as BookingActions from "../../state/booking/booking.actions";
import {Store} from "@ngrx/store";
import * as RoomAvailabilityActions from "../../state/room-availability/room-availability.actions";
import * as AuthSelectors from "../../state/auth/auth.selectors";
import {PendingBookingsComponent} from "./pending-bookings/pending-bookings.component";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ResourceOverviewCardsComponent,
    RecommendationsComponent,
    ResourceTableComponent,
    PendingBookingsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardPageComponent implements OnInit {
  currentUserId!: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(AuthSelectors.selectUser).subscribe(user => {
      if (user) {
        this.currentUserId = user.id;

        // ✅ Dispatch actions only after user is available
        this.store.dispatch(RoomActions.loadRooms());
        this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }));
        this.store.dispatch(RoomActions.loadUserRooms({ userId: this.currentUserId }));
        this.store.dispatch(BookingActions.loadPendingBookings({ userId: this.currentUserId }));

        // Profile actions dispatched here for better performance
        this.store.dispatch(BookingActions.loadUserBookings({ userId: this.currentUserId, lastBookingId: 0 }));
        this.store.dispatch(BookingActions.loadUserStatistics({ userId: this.currentUserId }));
        this.store.dispatch(BookingActions.loadUserRecentBookings({ userId: this.currentUserId }));
      }
    });
  }
}



