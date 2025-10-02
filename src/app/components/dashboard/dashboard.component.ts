import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceOverviewCardsComponent} from "./resource-overview-cards/resource-overview-cards.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ResourceTableComponent} from "./resource-table/resource-table.component";
import * as RoomActions from "../../state/room/room.actions";
import {Store} from "@ngrx/store";
import {SocketService} from "../../services/socket.service";
import * as RoomAvailabilityActions from "../../state/room-availability/room-availability.actions";
import {Subscription} from "rxjs";
import {loadRooms} from "../../state/room/room.actions";



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

  private socketSub?: Subscription;

  constructor(private store: Store , private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect();

    // the selectors inside the child components will fetch automatically the data in case of state chnages
    // this part is the responsible for listening to the rooms changes
    if (!this.socketSub) {
      this.socketSub = this.socketService.messages$.subscribe((msg) => {
        switch (msg.action) {
          case 'roomCreated':
          case 'roomUpdated':
          case 'roomDeleted':
            this.store.dispatch(loadRooms());
            this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }));
            console.log("**************************** roooooommmm  creaaaaated !!!!!!");
            break;
          // add other events like bookingCreated, equipmentAdded...
        }
      });
    }

    this.store.dispatch(RoomActions.loadRooms());
    this.store.dispatch(RoomAvailabilityActions.loadRoomAvailability({
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }));
  }
}



