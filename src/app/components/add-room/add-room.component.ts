import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomPageComponent {
  successMessage = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      const roomData = form.value;
      console.log('Room data to submit:', roomData);

      this.successMessage = true;

      // Reset after 3 seconds
      setTimeout(() => {
        form.resetForm();
        this.successMessage = false;
      }, 3000);
    }
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.successMessage = false;
  }
}
