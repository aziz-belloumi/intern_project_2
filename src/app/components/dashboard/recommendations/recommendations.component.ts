import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Room} from "../../../models/room.model";
import {RecommendationService} from "../../../services/recommendation.service";


@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recommendations.component.html' ,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  constructor(private recommendationService: RecommendationService) { }
  recommendations: Room[] =[] ;
  ngOnInit(): void {
    this.recommendationService.getRecommendations(1)
      .subscribe((rooms: Room[]) => {
        console.log('Recommended rooms:', rooms);
        this.recommendations = rooms;
      });
  }
}
