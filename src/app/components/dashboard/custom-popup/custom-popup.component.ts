import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Booking } from "../../../models/booking.model";
import * as BookingActions from '../../../state/booking/booking.actions';
import * as BookingSelectors from '../../../state/booking/booking.selectors';
import { Store } from "@ngrx/store";
import { Subject, takeUntil, filter } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('200ms ease-out'))
    ])
  ]
})
export class CustomPopupComponent implements OnInit, OnDestroy {
  @Input() roomId: number = 0;
  @Input() roomCapacity: number = 0;
  @Input() pricePerMinute: number = 0;
  @Input() isVisible: boolean = false;
  @Input() closeButtonText: string = 'Close';

  @Output() closed = new EventEmitter<void>();
  @Output() bookingConfirmed = new EventEmitter<Booking>();

  startTime: string = '';
  endTime: string = '';
  attendees: number = 1;
  purpose: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    // Listen for successful booking creation
    this.actions$.pipe(
      ofType(BookingActions.createBookingSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.bookingConfirmed.emit();
      this.close();
    });

    // Listen for booking creation failure
    this.actions$.pipe(
      ofType(BookingActions.createBookingFailure),
      takeUntil(this.destroy$)
    ).subscribe(({ error }) => {
      alert('Booking failed: ' + (error?.message || 'Unknown error'));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.isVisible = false;
    this.closed.emit();
  }

  confirmBooking() {
    if (!this.startTime || !this.endTime || !this.purpose || this.attendees <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }

    const start = new Date(this.startTime);
    const end = new Date(this.endTime);
    const duration = Math.floor((end.getTime() - start.getTime()) / 60000);

    if (duration <= 0) {
      alert('End time must be after start time.');
      return;
    }

    const capacityUtil = this.roomCapacity > 0 ? this.attendees / this.roomCapacity : 0;

    const booking: Booking = {
      userId: 1,
      roomId: this.roomId,
      purpose: this.purpose,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      durationMinutes: duration,
      attendees: this.attendees,
      isPreferredRoom: false,
      isPurposeCompatible: true,
      dayOfWeek: start.getDay(),
      hourOfDay: start.getHours(),
      month: start.getMonth() + 1,
      isWeekend: start.getDay() === 0 || start.getDay() === 6,
      capacityUtilization: capacityUtil,
      isPeakHour: start.getHours() >= 9 && start.getHours() <= 17,
      season: this.getSeason(start.getMonth() + 1),
      totalPrice: duration * this.pricePerMinute
    };

    this.store.dispatch(BookingActions.createBooking({ booking }));
  }

  private getSeason(month: number): number {
    if ([12, 1, 2].includes(month)) return 1; // Winter
    if ([3, 4, 5].includes(month)) return 2; // Spring
    if ([6, 7, 8].includes(month)) return 3; // Summer
    return 4; // Autumn
  }
}
