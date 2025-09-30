import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Booking, BookingStatus} from "../../../models/booking.model";
import {BookingService} from "../../../services/booking.service";

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
export class CustomPopupComponent {
  @Input() roomId!: number;
  @Input() roomCapacity!: number;
  @Input() pricePerMinute!: number;
  @Input() isVisible: boolean = false;
  @Input() closeButtonText: string = 'Close';

  @Output() closed = new EventEmitter<void>();
  @Output() bookingConfirmed = new EventEmitter<Booking>();

  startTime!: string;
  endTime!: string;
  attendees: number = 1;
  purpose: string = '';

  constructor(private bookingService: BookingService) {}

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

    const booking: Booking = {
      id: 0,
      userId: 1, // Replace with actual logged-in user id
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
      capacityUtilization: this.attendees / this.roomCapacity,
      isPeakHour: start.getHours() >= 9 && start.getHours() <= 18,
      season: this.getSeason(start.getMonth() + 1),
      totalPrice: duration * this.pricePerMinute,
      status: BookingStatus.Pending,
      createdAt: new Date().toISOString(),
      updatedAt: undefined
    };

    this.bookingService.createBooking(booking).subscribe({
      next: () => {
        alert('Booking created in Pending state!');
        this.bookingConfirmed.emit(booking);
        this.close();
      },
      error: (err) => console.error(err)
    });
  }

  private getSeason(month: number): number {
    if ([12, 1, 2].includes(month)) return 1; // Winter
    if ([3, 4, 5].includes(month)) return 2; // Spring
    if ([6, 7, 8].includes(month)) return 3; // Summer
    return 4; // Autumn
  }
}
