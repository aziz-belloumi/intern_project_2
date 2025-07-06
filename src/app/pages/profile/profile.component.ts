import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { UserInfoCardComponent } from 'src/app/components/user-info-card/user-info-card.component';
import { RecommendationCardComponent } from 'src/app/components/recommendation-card/recommendation-card.component';
import { BookingHistoryCardComponent } from 'src/app/components/booking-history-card/booking-history-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    UserInfoCardComponent,
    RecommendationCardComponent,
    BookingHistoryCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

}
