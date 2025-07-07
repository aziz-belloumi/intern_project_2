import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  
  constructor() { }

  onViewRooms() {
    console.log('Viewing available rooms...');
  }

  onViewEquipment() {
    console.log('Viewing equipment status...');
  }
}