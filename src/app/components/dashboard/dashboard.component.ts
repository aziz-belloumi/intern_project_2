import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceOverviewCardsComponent} from "./resource-overview-cards/resource-overview-cards.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ResourceTableComponent} from "./resource-table/resource-table.component";
import * as RoomActions from "../../state/room/room.actions";
import {Store} from "@ngrx/store";
import {SocketService} from "../../services/socket.service";



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
export class DashboardPageComponent implements OnInit{
  constructor(private store: Store , private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect();
    this.store.dispatch(RoomActions.loadRooms());
  }
}
