import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {Room} from "../../models/room.model";
import {FormsModule} from "@angular/forms";
import { CustomPopupComponent } from "./custom-popup/custom-popup.component";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, CustomPopupComponent],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExplorePageComponent {
  sampleRooms: Room[] = [
    { id: 1, capacity: 12, roomType: 'conference', hasProjector: true, hasWhiteboard: true, description: 'Modern conference room...', pricePerMinute: 0.75},
    { id: 2, capacity: 8, roomType: 'meeting', hasProjector: false, hasWhiteboard: true, description: 'Cozy meeting room...', pricePerMinute: 0.60},
    { id: 3, capacity: 20, roomType: 'training', hasProjector: true, hasWhiteboard: true, description: 'Spacious training room...', pricePerMinute: 1.25},
    { id: 4, capacity: 6, roomType: 'huddle', hasProjector: false, hasWhiteboard: false, description: 'Quick huddle space...', pricePerMinute: 0.45 },
    { id: 5, capacity: 15, roomType: 'boardroom', hasProjector: true, hasWhiteboard: false, description: 'Executive boardroom...', pricePerMinute: 1.50 },
    { id: 6, capacity: 25, roomType: 'presentation', hasProjector: true, hasWhiteboard: true, description: 'Large presentation room...', pricePerMinute: 1.75},
    { id: 1, capacity: 12, roomType: 'conference', hasProjector: true, hasWhiteboard: true, description: 'Modern conference room...', pricePerMinute: 0.75},
    { id: 2, capacity: 8, roomType: 'meeting', hasProjector: false, hasWhiteboard: true, description: 'Cozy meeting room...', pricePerMinute: 0.60, },
    { id: 3, capacity: 20, roomType: 'training', hasProjector: true, hasWhiteboard: true, description: 'Spacious training room...', pricePerMinute: 1.25 },
    { id: 4, capacity: 6, roomType: 'huddle', hasProjector: false, hasWhiteboard: false, description: 'Quick huddle space...', pricePerMinute: 0.45},
    { id: 5, capacity: 15, roomType: 'boardroom', hasProjector: true, hasWhiteboard: false, description: 'Executive boardroom...', pricePerMinute: 1.50 },
    { id: 6, capacity: 25, roomType: 'presentation', hasProjector: true, hasWhiteboard: true, description: 'Large presentation room...', pricePerMinute: 1.75}
  ];

  filteredRooms: Room[] = [];
  searchTerm = '';
  capacityFilter = '';
  typeFilter = '';
  priceFilter = '';
  projectorFilter = false;
  whiteboardFilter = false;
  currentView: 'grid' | 'list' = 'grid';

  // Popup properties
  showPopup = false;
  selectedRoom: Room | null = null;

  ngOnInit() {
    this.filteredRooms = [...this.sampleRooms];
  }

  filterRooms() {
    this.filteredRooms = this.sampleRooms.filter(room => {
      const matchesSearch = room.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        || room.roomType.toLowerCase().includes(this.searchTerm.toLowerCase())
        || room.capacity.toString().includes(this.searchTerm);

      let matchesCapacity = true;
      if (this.capacityFilter) {
        if (this.capacityFilter === '1-5') matchesCapacity = room.capacity <= 5;
        else if (this.capacityFilter === '6-10') matchesCapacity = room.capacity >= 6 && room.capacity <= 10;
        else if (this.capacityFilter === '11-20') matchesCapacity = room.capacity >= 11 && room.capacity <= 20;
        else if (this.capacityFilter === '21+') matchesCapacity = room.capacity >= 21;
      }

      const matchesType = !this.typeFilter || room.roomType === this.typeFilter;

      let matchesPrice = true;
      if (this.priceFilter) {
        if (this.priceFilter === '0-0.5') matchesPrice = room.pricePerMinute <= 0.5;
        else if (this.priceFilter === '0.5-1') matchesPrice = room.pricePerMinute > 0.5 && room.pricePerMinute <= 1;
        else if (this.priceFilter === '1-2') matchesPrice = room.pricePerMinute > 1 && room.pricePerMinute <= 2;
        else if (this.priceFilter === '2+') matchesPrice = room.pricePerMinute > 2;
      }

      const matchesProjector = !this.projectorFilter || room.hasProjector;
      const matchesWhiteboard = !this.whiteboardFilter || room.hasWhiteboard;

      return matchesSearch && matchesCapacity && matchesType && matchesPrice && matchesProjector && matchesWhiteboard;
    });
  }

  setView(view: 'grid' | 'list') {
    this.currentView = view;
  }

  formatRoomType(type: string) {
    const types: Record<string, string> = {
      meeting: 'Meeting Room',
      conference: 'Conference Room',
      training: 'Training Room',
      boardroom: 'Boardroom',
      presentation: 'Presentation Room',
      huddle: 'Huddle Room'
    };
    return types[type] || type;
  }

  bookRoom(roomId: number) {
    const room = this.sampleRooms.find(r => r.id === roomId);
    if (room) {
      alert(`Booking Room ${roomId} - ${this.formatRoomType(room.roomType)}\nCapacity: ${room.capacity}\nPrice: $${room.pricePerMinute.toFixed(2)}/min`);
    }
  }

  viewDetails(roomId: number) {
    const room = this.sampleRooms.find(r => r.id === roomId);
    if (room) {
      this.selectedRoom = room;
      this.showPopup = true;
    }
  }

  onPopupClosed() {
    this.showPopup = false;
    this.selectedRoom = null;
  }
}
