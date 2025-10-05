import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BookingSelectors from '../../../state/booking/booking.selectors';
import { Observable } from 'rxjs';
import { Booking } from '../../../models/booking.model';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pending-bookings',
  templateUrl: './pending-bookings.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./pending-bookings.component.css']
})
export class PendingBookingsComponent implements OnInit {

  pendingBookings: Booking[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(BookingSelectors.selectPendingBookings).subscribe(pendings => {
      this.pendingBookings = pendings;
    });



    console.log('**************************************************',this.pendingBookings);
  }

  approveBooking(id: number) {
    console.log('Approved booking:', id);
    // dispatch action or call service to approve booking
  }

  rejectBooking(id: number) {
    console.log('Rejected booking:', id);
    // dispatch action or call service to reject booking
  }
}
