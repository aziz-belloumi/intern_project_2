import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import * as BookingSelectors from '../../../state/booking/booking.selectors';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-pending-bookings',
  templateUrl: './pending-bookings.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  styleUrls: ['./pending-bookings.component.css']
})
export class PendingBookingsComponent  {
  pendingBookings$ = this.store.select(BookingSelectors.selectPendingBookings);

  constructor(private store: Store, private bookingService: BookingService) {}

  approveBooking(id: number) {
    this.bookingService.confirmBookingPayment(id).subscribe({
      next: (res) => {
        console.log(`Booking ${id} confirmed successfully`, res);
      },
      error: (err) => {
        console.error(`Failed to confirm booking ${id}`, err);
      }
    });
  }
}
