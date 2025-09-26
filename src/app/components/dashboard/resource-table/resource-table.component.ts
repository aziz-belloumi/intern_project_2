import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as RoomAvailabilitySelectors from '../../../state/room-availability/room-availability.selectors';
import { Store } from '@ngrx/store';

interface Room {
  roomId: number;
  capacity: number;
  status: string;
  message: string;
}

@Component({
  selector: 'app-resource-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {
  rooms$ = this.store.select(RoomAvailabilitySelectors.selectAllRooms);

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
      console.log(`Reserving Room ${room.roomId}`);
    }
  }

}
