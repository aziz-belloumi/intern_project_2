import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceOverviewCardsComponent} from "./resource-overview-cards/resource-overview-cards.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ResourceTableComponent} from "./resource-table/resource-table.component";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ResourceOverviewCardsComponent,
    RecommendationsComponent,
    ResourceTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardPageComponent {}
