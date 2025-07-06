import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navigationItems = [
    { label: 'Home', active: true },
    { label: 'profile', active: false }
  ];

  onNavigate(item: any) {
    // Reset all items to inactive
    this.navigationItems.forEach(nav => nav.active = false);
    // Set clicked item to active
    item.active = true;
  }
}