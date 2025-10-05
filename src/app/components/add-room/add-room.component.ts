import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Store } from "@ngrx/store";
import * as RoomActions from "../../state/room/room.actions";
import {RoomService} from "../../services/room.service";
import {User} from "../../models/user.model";
import * as AuthSelectors from "../../state/auth/auth.selectors";
import * as RoomSelectors from "../../state/room/room.selectors";
import {Room} from "../../models/room.model";
import {SocketService} from "../../services/socket.service";


@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomPageComponent implements OnInit {
  successMessage = false;
  currentUser!: User; // fetched once
  currentUserId!: number;
  userRooms: Room[] = [];

  selectedRoom!: Room | null;
  showUpdatePopup = false;


  constructor(private store: Store , private roomService: RoomService, private socketService: SocketService ) {
    this.store.select(AuthSelectors.selectUser).subscribe(user => {
      if (user) this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.currentUser.id;
    this.store.select(RoomSelectors.selectUserRooms).subscribe(rooms => {
      this.userRooms = rooms;
    });

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const roomData = {
        capacity: form.value.capacity,
        roomType: form.value.roomType,
        pricePerMinute: form.value.pricePerMinute,
        hasProjector: !!form.value.hasProjector,
        hasWhiteboard: !!form.value.hasWhiteboard,
        description: form.value.description,
        userId: 1
      };

      this.store.dispatch(RoomActions.createRoom({ room: roomData }));
      console.log("roomData", roomData);

      this.successMessage = true;

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.successMessage = false;
      }, 2000);
      form.resetForm();

      // Reload rooms to show the new one
      this.store.dispatch(RoomActions.loadUserRooms({ userId: this.currentUserId }));
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
    this.selectedRoom = { ...room };
    this.showUpdatePopup = true;
  }

  confirmUpdate(): void {
    if (!this.selectedRoom) return;

    this.roomService.updateRoom(this.selectedRoom.id!, this.selectedRoom)
      .subscribe({
        next: (success) => {
          if (success) {
            // Create a new array with the updated room
            this.userRooms = this.userRooms.map(r =>
              r.id === this.selectedRoom!.id ? { ...this.selectedRoom! } : r
            );

            this.showUpdatePopup = false;
            this.selectedRoom = null;

            this.successMessage = true;
            setTimeout(() => this.successMessage = false, 3000);
          }
        },
        error: (err) => console.error("Update failed", err)
      });
  }


  discardUpdate(): void {
    this.showUpdatePopup = false;
    this.selectedRoom = null;
  }

  deleteRoom(roomId: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this room? This action cannot be undone.'
    );

    if (confirmed) {
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
