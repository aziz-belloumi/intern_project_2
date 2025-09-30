import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as RoomAvailabilitySelectors from '../../../state/room-availability/room-availability.selectors';
import { Store } from '@ngrx/store';
import {CustomPopupComponent} from "../custom-popup/custom-popup.component"; // adjust path

interface Room {
  roomId: number;
  capacity: number;
  status: string;
  message: string;
}

@Component({
  selector: 'app-resource-table',
  standalone: true,
  imports: [CommonModule, CustomPopupComponent],
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {
  rooms$ = this.store.select(RoomAvailabilitySelectors.selectAllRooms);

  isPopupVisible = false;
  selectedRoom: Room | null = null;

  constructor(private store: Store) {}

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'available': return '✅';
      case 'not available': return '⛔';
      default: return '❓';
    }
  }

  getStatusText(status: string): string {
    return status;
  }

  reserveRoom(room: Room) {
    if (room.status.toLowerCase() === 'available') {
      this.selectedRoom = room;
      this.isPopupVisible = true;
    }
  }

  closePopup() {
    this.isPopupVisible = false;
    this.selectedRoom = null;
  }

  onBookingConfirmed(event: { startTime: string; endTime: string }) {
    console.log(`Room ${this.selectedRoom?.roomId} reserved:`, event);
    // 🔗 Call backend service here with room + event.startTime + event.endTime
    this.closePopup();
  }
}
