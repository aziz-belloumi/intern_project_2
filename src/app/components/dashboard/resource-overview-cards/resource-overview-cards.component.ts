import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as RoomSelectors from "../../../state/room/room.selectors";
import {Store} from "@ngrx/store";
import * as RoomActions from "../../../state/room/room.actions";

@Component({
  selector: 'app-resource-overview-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'resource-overview-cards.component.html',
  styleUrls: ['./resource-overview-cards.component.css'],
})
export class ResourceOverviewCardsComponent implements OnInit {
  rooms$ = this.store.select(RoomSelectors.selectAllRooms);
  roomsLoading$ = this.store.select(RoomSelectors.selectRoomsLoading);


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.store.dispatch(RoomActions.loadRooms());
  }

  @ViewChild('cardsWrapper', { static: false }) cardsWrapper!: ElementRef;

  scrollLeft() {
    this.cardsWrapper.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardsWrapper.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
