import { Component } from '@angular/core';

@Component({
  selector: 'app-book-resource',
  standalone: true,
  templateUrl: './book-resource.component.html',
  styleUrls: ['./book-resource.component.css']
})
export class BookResourceComponent {
  bookingForm = {
    resourceName: '',
    date: '',
    timeSlot: '',
    comments: ''
  };

  resources = [
    'Conference Room A',
    'Conference Room B',
    'Meeting Room 1',
    'Meeting Room 2',
    'Presentation Hall',
    'Training Room'
  ];

  timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Booking submitted:', this.bookingForm);
      // Handle booking logic here
      alert('Resource booked successfully!');
      this.resetForm();
    } else {
      alert('Please fill in all required fields');
    }
  }

  isFormValid(): boolean {
    return !!(this.bookingForm.resourceName && 
              this.bookingForm.date && 
              this.bookingForm.timeSlot);
  }

  resetForm() {
    this.bookingForm = {
      resourceName: '',
      date: '',
      timeSlot: '',
      comments: ''
    };
  }
}