import {Component, ElementRef,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as RoomSelectors from "../../../state/room/room.selectors";
import {Store} from "@ngrx/store";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-resource-overview-cards',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: 'resource-overview-cards.component.html',
  styleUrls: ['./resource-overview-cards.component.css'],
})
export class ResourceOverviewCardsComponent  {
  constructor(private store: Store) { }

  rooms$ = this.store.select(RoomSelectors.selectAllRooms);
  roomsLoading$ = this.store.select(RoomSelectors.selectRoomsLoading);

  @ViewChild('cardsWrapper', { static: false }) cardsWrapper!: ElementRef;

  scrollLeft() {
    this.cardsWrapper.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardsWrapper.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
