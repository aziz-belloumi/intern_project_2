import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Store } from "@ngrx/store";
import * as RoomActions from "../../state/room/room.actions";
import {RoomService} from "../../services/room.service";

export interface Room {
  id: number;
  capacity: number;
  roomType: string;
  pricePerMinute: number;
  hasProjector: boolean;
  hasWhiteboard: boolean;
  description: string;
}

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomPageComponent implements OnInit {
  successMessage = false;
  showUpdatePopup = false;

  // User's rooms
  userRooms: Room[] = [];


  constructor(private store: Store , private roomService: RoomService ) {}

  ngOnInit(): void {
    this.loadUserRooms();
  }

  loadUserRooms(): void {
    const userId = 1; // 👈 replace with actual logged-in user ID
    this.roomService.getUserRooms(userId).subscribe({
      next: (rooms) => {
        this.userRooms = rooms;
        console.log("Fetched user rooms:", rooms);
      },
      error: (err) => {
        console.error("Error fetching rooms", err);
      }
    });
  }

  // add the user id in the request !!!!!!!!!!!!!!!!!!!!!!!!!!!
  onSubmit(form: NgForm) {
    if (form.valid) {
      const roomData = {
        capacity: form.value.capacity,
        roomType: form.value.roomType,
        pricePerMinute: form.value.pricePerMinute,
        hasProjector: !!form.value.hasProjector,
        hasWhiteboard: !!form.value.hasWhiteboard,
        description: form.value.description
      };

      this.store.dispatch(RoomActions.createRoom({ room: roomData }));
      console.log("roomData", roomData);

      this.successMessage = true;

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.successMessage = false;
      }, 3000);

      form.resetForm();

      // Reload rooms to show the new one
      this.loadUserRooms();
    }
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.successMessage = false;
  }

  formatRoomType(type: string): string {
    const typeMap: { [key: string]: string } = {
      'meeting': 'Meeting Room',
      'training': 'Training Room',
      'interview': 'Interview Room',
      'flex': 'Flexible Room',
      'conference': 'Conference Room',
      'boardroom': 'Boardroom',
      'presentation': 'Presentation Room',
      'huddle': 'Huddle Room',
      'other': 'Other'
    };
    return typeMap[type] || type;
  }

  openUpdatePopup(room: Room): void {
    // this.selectedRoom = { ...room }; // Create a copy to avoid direct modification
    // this.showUpdatePopup = true;
  }

  closeUpdatePopup(): void {
    this.showUpdatePopup = false;
  }

  onUpdate(form: NgForm): void {
    // if (form.valid) {
    //   // Dispatch update action to store
    //   // this.store.dispatch(RoomActions.updateRoom({
    //   //   id: this.selectedRoom.id,
    //   //   room: this.selectedRoom
    //   // }));
    //
    //   console.log("Updating room:", this.selectedRoom);
    //
    //   // Update the room in the local array
    //   const index = this.userRooms.findIndex(r => r.id === this.selectedRoom.id);
    //   if (index !== -1) {
    //     this.userRooms[index] = { ...this.selectedRoom };
    //   }
    //
    //   this.closeUpdatePopup();
    //
    //   // Show success message
    //   this.successMessage = true;
    //   setTimeout(() => {
    //     this.successMessage = false;
    //   }, 3000);
    // }
  }

  deleteRoom(roomId: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this room? This action cannot be undone.'
    );

    if (confirmed) {
      // Dispatch delete action to store
      this.store.dispatch(RoomActions.deleteRoom({ id: roomId }));

      console.log("Deleting room:", roomId);

      // Remove from local array
      this.userRooms = this.userRooms.filter(room => room.id !== roomId);

      // Show success message
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 3000);
    }
  }}
