import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Store} from "@ngrx/store";
import * as RoomActions from "../../state/room/room.actions";

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomPageComponent {
  successMessage = false;

  constructor(private store: Store) {}

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
      this.store.dispatch(RoomActions.createRoom({room :roomData}));
      console.log("roomData", roomData);
      form.resetForm();
    }
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.successMessage = false;
  }
}
