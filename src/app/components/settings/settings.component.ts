import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {User} from "../../models/user.model";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  styleUrls: ['./settings.component.css']
})
export class SettingsPageComponent implements OnInit {
  // User data
  user: User = {
    id: 1,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    preferredRoomIds: ''
  };

  // Original user data for cancel functionality
  originalUser: User = { ...this.user };

  // Password fields
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Notification preferences
  emailNotifications: boolean = true;
  smsNotifications: boolean = false;
  bookingReminders: boolean = true;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Simulate loading user data from a service
    // In a real application, you would fetch this from your backend
    this.user = {
      id: 1,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: 1234567890,
      preferredRoomIds: '101, 205, 308'
    };

    // Store original data for cancel functionality
    this.originalUser = { ...this.user };
  }

  saveChanges(): void {
    // Validate email
    if (!this.validateEmail(this.user.email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Validate phone number
    if (!this.user.phoneNumber || this.user.phoneNumber <= 0) {
      this.showNotification('Please enter a valid phone number', 'error');
      return;
    }

    // Validate names
    if (!this.user.firstName.trim() || !this.user.lastName.trim()) {
      this.showNotification('First name and last name are required', 'error');
      return;
    }

    // Validate password change if attempted
    if (this.currentPassword || this.newPassword || this.confirmPassword) {
      if (!this.validatePasswordChange()) {
        return;
      }
    }

    // In a real application, you would send this data to your backend
    console.log('Saving user data:', this.user);
    console.log('Email notifications:', this.emailNotifications);
    console.log('SMS notifications:', this.smsNotifications);
    console.log('Booking reminders:', this.bookingReminders);

    // Update original user data
    this.originalUser = { ...this.user };

    // Clear password fields
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.showNotification('Settings saved successfully!', 'success');
  }

  cancelChanges(): void {
    // Restore original user data
    this.user = { ...this.originalUser };

    // Clear password fields
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.showNotification('Changes cancelled', 'info');
  }

  validatePasswordChange(): boolean {
    if (!this.currentPassword) {
      this.showNotification('Please enter your current password', 'error');
      return false;
    }

    if (!this.newPassword) {
      this.showNotification('Please enter a new password', 'error');
      return false;
    }

    if (this.newPassword.length < 8) {
      this.showNotification('Password must be at least 8 characters long', 'error');
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showNotification('New passwords do not match', 'error');
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  deleteAccount(): void {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmed) {
      // In a real application, you would call your backend API to delete the account
      console.log('Deleting account for user:', this.user.id);
      this.showNotification('Account deletion initiated. You will be logged out shortly.', 'warning');

      // Simulate logout after 2 seconds
      setTimeout(() => {
        // Navigate to login or home page
        console.log('Logging out...');
      }, 2000);
    }
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }
}
