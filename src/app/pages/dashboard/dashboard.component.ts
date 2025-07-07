import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/dashboard-components/header/header.component';
import { DashboardCardComponent } from 'src/app/components/dashboard-components/dashboard-card/dashboard-card.component';
import { CalendarComponent } from 'src/app/components/dashboard-components/calendar/calendar.component';
import { BookResourceComponent } from 'src/app/components/dashboard-components/book-resource/book-resource.component';
import { AiRecommendationsComponent } from 'src/app/components/dashboard-components/ai-recommendations/ai-recommendations.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    DashboardCardComponent,
    CalendarComponent,
    BookResourceComponent,
    AiRecommendationsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardPageComponent {
  constructor() { }

  onBookResource() {
    // Handle book resource logic
    console.log('Booking resource...');
  }
}