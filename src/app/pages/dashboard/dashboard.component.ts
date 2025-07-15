import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from 'src/app/components/dashboard-components/dashboard-card/dashboard-card.component';
import { CalendarComponent } from 'src/app/components/dashboard-components/calendar/calendar.component';
import { BookResourceComponent } from 'src/app/components/dashboard-components/book-resource/book-resource.component';
import { AiRecommendationsComponent } from 'src/app/components/dashboard-components/ai-recommendations/ai-recommendations.component';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardCardComponent,
    CalendarComponent,
    BookResourceComponent,
    AiRecommendationsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardPageComponent implements OnInit {
  constructor(private authService: AuthService , private userService: UserService) { }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    if(user){
      this.userService.setUser(user);
    }
  }
}
