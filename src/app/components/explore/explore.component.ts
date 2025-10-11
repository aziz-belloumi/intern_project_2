import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Room } from "../../models/room.model";
import { CustomPopupComponent } from "./custom-popup/custom-popup.component";
import * as RoomActions from "../../state/room/room.actions";
import * as RoomSelectors from "../../state/room/room.selectors";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, CustomPopupComponent],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExplorePageComponent implements OnInit {
  filteredRooms$: Observable<Room[]>;
  loading$: Observable<boolean>;
  filteredRooms: Room[] = [];

  searchTerm = '';
  capacityFilter = '';
  typeFilter = '';
  priceFilter = '';
  projectorFilter = false;
  whiteboardFilter = false;
  currentView: 'grid' | 'list' = 'grid';

  showPopup = false;
  selectedRoom: Room | null = null;

  roomsPerPage = 9;
  currentPage = 1;
  totalPages = 1;

  constructor(private store: Store) {
    this.filteredRooms$ = this.store.select(RoomSelectors.selectFilteredRooms);
    this.loading$ = this.store.select(RoomSelectors.selectRoomsLoading);
  }

  ngOnInit() {
    this.store.dispatch(RoomActions.loadRooms());

    // Subscribe to room updates from store
    this.filteredRooms$.subscribe(rooms => {
      this.filteredRooms = rooms;
      this.totalPages = Math.ceil(this.filteredRooms.length / this.roomsPerPage);
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;
    });
  }

  filterRooms() {
    const params: any = {};

    if (this.searchTerm) params.searchTerm = this.searchTerm;

    if (this.capacityFilter) {
      if (this.capacityFilter === '1-5') params.maxCapacity = 5;
      else if (this.capacityFilter === '6-10') { params.minCapacity = 6; params.maxCapacity = 10; }
      else if (this.capacityFilter === '11-20') { params.minCapacity = 11; params.maxCapacity = 20; }
      else if (this.capacityFilter === '21+') params.minCapacity = 21;
    }

    if (this.typeFilter) params.roomType = this.typeFilter;

    if (this.priceFilter) {
      if (this.priceFilter === '0-0.5') params.maxPrice = 0.5;
      else if (this.priceFilter === '0.5-1') { params.minPrice = 0.5; params.maxPrice = 1; }
      else if (this.priceFilter === '1-2') { params.minPrice = 1; params.maxPrice = 2; }
      else if (this.priceFilter === '2+') params.minPrice = 2;
    }

    if (this.projectorFilter) params.hasProjector = true;
    if (this.whiteboardFilter) params.hasWhiteboard = true;

    // Dispatch search action (backend will handle filters)
    this.store.dispatch(RoomActions.searchRooms({ params }));

    this.currentPage = 1;
  }

  setView(view: 'grid' | 'list') {
    this.currentView = view;
  }

  formatRoomType(type: string): string {
    const map: Record<string, string> = {
      meeting: 'Meeting Room',
      conference: 'Conference Room',
      training: 'Training Room',
      boardroom: 'Boardroom',
      presentation: 'Presentation Room',
      huddle: 'Huddle Room'
    };
    return map[type] || type;
  }

  bookRoom(roomId: number) {
    const room = this.filteredRooms.find(r => r.id === roomId);
    if (room) {
      alert(`Booking Room ${roomId} - ${this.formatRoomType(room.roomType)}\nCapacity: ${room.capacity}\nPrice: $${room.pricePerMinute.toFixed(2)}/min`);
    }
  }

  viewDetails(roomId: number) {
    const room = this.filteredRooms.find(r => r.id === roomId);
    if (room) {
      this.selectedRoom = room;
      this.showPopup = true;
    }
  }

  onPopupClosed() {
    this.showPopup = false;
    this.selectedRoom = null;
  }

  goToPage(page: number) {
    if (this.totalPages === 0) return;
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
  }
}
