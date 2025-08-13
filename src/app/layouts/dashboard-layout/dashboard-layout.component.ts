import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {HeaderComponent} from "../../components/dashboard/header/header.component";
import {filter} from "rxjs";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  showHeader = false;

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Show header only on dashboard route
      this.showHeader = this.router.url === '/dashboard';
    });
  }

}
