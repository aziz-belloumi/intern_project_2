import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgForOf, NgIf, AsyncPipe } from "@angular/common";
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Equipment } from '../../models/equipment.model';
import { EquipmentBooking, EquipmentBookingStatus } from '../../models/equipment-booking.model';
import * as EquipmentActions from '../../state/equipment/equipment.actions';
import * as EquipmentSelectors from '../../state/equipment/equipment.selectors';
import * as EquipmentBookingActions from '../../state/equipment-booking/equipment-booking.actions';
import * as EquipmentBookingSelectors from '../../state/equipment-booking/equipment-booking.selectors';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
  ],
  styleUrls: ['./equipment.component.css']
})
export class EquipmentPageComponent implements OnInit, OnDestroy {
  // Observables
  userEquipment$!: Observable<Equipment[]>;
  filteredEquipment$!: Observable<Equipment[]>;
  loading$!: Observable<boolean>;
  pendingBookings$!: Observable<EquipmentBooking[]>;

  // Local state
  userEquipment: Equipment[] = [];
  filteredEquipment: Equipment[] = [];
  pendingBookings: EquipmentBooking[] = [];

  successMessage: boolean = false;
  searchTerm: string = '';
  filterType: string = '';

  // Current user ID (replace with actual auth service)
  currentUserId: number = 1;

  // Booking popup state
  showBookingPopup: boolean = false;
  selectedEquipmentForBooking: Equipment | null = null;
  bookingStartTime: string = '';
  bookingEndTime: string = '';

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Load user's equipment
    this.store.dispatch(EquipmentActions.loadUserEquipment({ userId: this.currentUserId }));

    // Load all equipment
    this.store.dispatch(EquipmentActions.loadAllEquipment());

    // Load pending bookings
    this.store.dispatch(EquipmentBookingActions.loadPendingBookings({ userId: this.currentUserId }));

    // Subscribe to selectors
    this.userEquipment$ = this.store.select(EquipmentSelectors.selectUserEquipment);
    this.filteredEquipment$ = this.store.select(EquipmentSelectors.selectFilteredEquipment);
    this.loading$ = this.store.select(EquipmentSelectors.selectEquipmentLoading);
    this.pendingBookings$ = this.store.select(EquipmentBookingSelectors.selectPendingBookings);

    // Subscribe to get local copies
    this.userEquipment$.pipe(takeUntil(this.destroy$)).subscribe(equipment => {
      this.userEquipment = equipment;
    });

    this.filteredEquipment$.pipe(takeUntil(this.destroy$)).subscribe(equipment => {
      this.filteredEquipment = equipment;
    });

    this.pendingBookings$.pipe(takeUntil(this.destroy$)).subscribe(bookings => {
      this.pendingBookings = bookings;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Filter/Search equipment
  onSearchChange(): void {
    this.filterEquipment();
  }

  onFilterChange(): void {
    this.filterEquipment();
  }

  filterEquipment(): void {
    const params: any = {};

    if (this.searchTerm) {
      params.searchTerm = this.searchTerm;
    }

    if (this.filterType) {
      params.type = this.filterType;
    }

    this.store.dispatch(EquipmentActions.searchEquipment({ params }));
  }

  // Add new equipment
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;

      const newEquipment: Equipment = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        price: formData.price || undefined,
        serialNumber: formData.serialNumber || undefined,
        hasWarranty: formData.hasWarranty || false,
        isPortable: formData.isPortable || false,
        userId: this.currentUserId
      };

      this.store.dispatch(EquipmentActions.createEquipment({ equipment: newEquipment }));

      this.showSuccessMessage();
      form.resetForm();
    }
  }

  onCancel(form: NgForm): void {
    form.resetForm();
    this.successMessage = false;
  }

  // Update equipment
  updateEquipment(equipmentId: number): void {
    const equipment = this.userEquipment.find(eq => eq.id === equipmentId);
    if (equipment) {
      // TODO: Open update modal/popup
      const updatedData = prompt('Enter new name:', equipment.name);

      if (updatedData) {
        const updatedEquipment: Equipment = {
          ...equipment,
          name: updatedData
        };

        this.store.dispatch(EquipmentActions.updateEquipment({
          id: equipmentId,
          equipment: updatedEquipment
        }));
      }
    }
  }

  // Delete equipment
  deleteEquipment(equipmentId: number): void {
    const equipment = this.userEquipment.find(eq => eq.id === equipmentId);
    const confirmDelete = confirm(`Are you sure you want to delete "${equipment?.name}"?`);

    if (confirmDelete) {
      this.store.dispatch(EquipmentActions.deleteEquipment({ id: equipmentId }));
    }
  }

  // Book equipment
  bookEquipment(equipmentId: number): void {
    const equipment = this.filteredEquipment.find(eq => eq.id === equipmentId);

    if (!equipment) {
      alert('Equipment not found!');
      return;
    }

    if (equipment.userId === this.currentUserId) {
      alert('You cannot book your own equipment!');
      return;
    }

    this.selectedEquipmentForBooking = equipment;
    this.showBookingPopup = true;
  }

  confirmBookingReservation(): void {
    if (!this.selectedEquipmentForBooking || !this.bookingStartTime || !this.bookingEndTime) {
      alert('Please fill in all booking details');
      return;
    }

    const start = new Date(this.bookingStartTime);
    const end = new Date(this.bookingEndTime);
    const duration = Math.floor((end.getTime() - start.getTime()) / 60000);

    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    const booking: EquipmentBooking = {
      equipmentId: this.selectedEquipmentForBooking.id!,
      userId: this.currentUserId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      durationMinutes: duration,
      status: EquipmentBookingStatus.Pending
    };

    this.store.dispatch(EquipmentBookingActions.createBooking({ booking }));

    alert('Booking request submitted! Status: Pending');
    this.closeBookingPopup();
  }

  closeBookingPopup(): void {
    this.showBookingPopup = false;
    this.selectedEquipmentForBooking = null;
    this.bookingStartTime = '';
    this.bookingEndTime = '';
  }

  // Confirm pending booking
  confirmPendingBooking(bookingId: number): void {
    this.store.dispatch(EquipmentBookingActions.confirmBooking({ bookingId }));
  }

  // Cancel pending booking
  cancelPendingBooking(bookingId: number): void {
    this.store.dispatch(EquipmentBookingActions.cancelBooking({ bookingId }));
  }

  // Helper methods
  private showSuccessMessage(): void {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 5000);
  }

  getEquipmentTypeDisplay(type: string): string {
    const typeMap: { [key: string]: string } = {
      'laptop': 'Laptop',
      'desktop': 'Desktop Computer',
      'monitor': 'Monitor',
      'projector': 'Projector',
      'camera': 'Camera',
      'audio': 'Audio Equipment',
      'networking': 'Networking',
      'other': 'Other'
    };
    return typeMap[type] || type;
  }

  formatPrice(price?: number): string {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  formatDateTime(date?: string): string {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  getBookingStatusDisplay(status: EquipmentBookingStatus): string {
    const statusMap: { [key: number]: string } = {
      [EquipmentBookingStatus.Pending]: 'Pending',
      [EquipmentBookingStatus.Confirmed]: 'Confirmed',
      [EquipmentBookingStatus.Cancelled]: 'Cancelled',
      [EquipmentBookingStatus.Completed]: 'Completed'
    };
    return statusMap[status] || 'Unknown';
  }
}
