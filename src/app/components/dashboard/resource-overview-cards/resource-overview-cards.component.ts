import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Room} from "../../../models/room.model";

@Component({
  selector: 'app-resource-overview-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'resource-overview-cards.component.html',
  styleUrls: ['./resource-overview-cards.component.css'],
})
export class ResourceOverviewCardsComponent {
  @Input() rooms: Room[] | null = [];

  @ViewChild('cardsWrapper', { static: false }) cardsWrapper!: ElementRef;

  scrollLeft() {
    this.cardsWrapper.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardsWrapper.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
