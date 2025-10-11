import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as RoomAvailabilitySelectors from '../../../state/room-availability/room-availability.selectors';
import * as RoomAvailabilityActions from '../../../state/room-availability/room-availability.actions';
import { Store } from '@ngrx/store';
import { CustomPopupComponent } from "../custom-popup/custom-popup.component";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-resource-table',
  standalone: true,
  imports: [CommonModule, CustomPopupComponent, FormsModule],
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {
  rooms$ = this.store.select(RoomAvailabilitySelectors.selectAllRooms);

  isPopupVisible = false;
  selectedRoom: any = null;
  startTime?: string;
  endTime?: string;

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

  reserveRoom(room: any) {
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
    //console.log(`Room ${this.selectedRoom?.roomId} reserved:`, event);
    // 🔗 Call backend service here with room + event.startTime + event.endTime
    this.closePopup();
  }

  loadAvailability() {
    this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
      startTime: this.startTime ? new Date(this.startTime).toISOString() : undefined,
      endTime: this.endTime ? new Date(this.endTime).toISOString() : undefined
    }));
  }
}
