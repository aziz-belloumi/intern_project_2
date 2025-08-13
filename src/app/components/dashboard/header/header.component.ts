import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl:'./header.component.html' ,
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  searchQuery = '';
  notificationCount = 0;

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    // Implement search logic
    console.log('Searching for:', this.searchQuery);
  }

  showHelp() {
    console.log('Help clicked');
  }

  showNotifications() {
    console.log('Notifications clicked');
  }

  showSettings() {
    console.log('Settings clicked');
  }

  showProfile() {
    console.log('Profile clicked');
  }
}
