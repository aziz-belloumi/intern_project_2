import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceOverviewCardsComponent} from "./resource-overview-cards/resource-overview-cards.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ResourceTableComponent} from "./resource-table/resource-table.component";
import { Store } from '@ngrx/store';
import * as RoomActions from '../../state/room/room.actions';
import * as RoomSelectors from "../../state/room/room.selectors"


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
export class DashboardPageComponent implements OnInit {

  rooms$ = this.store.select(RoomSelectors.selectAllRooms);

  constructor(private store: Store) { }
    ngOnInit(): void {
      this.store.dispatch(RoomActions.loadRooms());
      this.rooms$.subscribe(rooms => {
        console.log('Rooms loaded:', rooms);
      });
    }


}
