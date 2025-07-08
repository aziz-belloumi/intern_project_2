import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navigationItems = [
    { label: 'Dashboard', active: true , route: '/dashboard'},
    { label: 'profile', active: false  , route: '/profile' },
  ];
}