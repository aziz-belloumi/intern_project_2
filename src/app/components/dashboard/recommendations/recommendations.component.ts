import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Room} from "../../../models/room.model";
import * as RecommendationSelectors from "../../../state/recommendation/recommendation.selectors";
import * as RecommendationActions from "../../../state/recommendation/recommendation.actions";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recommendations.component.html' ,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  recommendations$: Observable<Room[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.recommendations$ = this.store.select(RecommendationSelectors.selectRecommendations);
    this.loading$ = this.store.select(RecommendationSelectors.selectRecommendationLoading);
    this.error$ = this.store.select(RecommendationSelectors.selectRecommendationError);
  }

  ngOnInit(): void {
    this.store.dispatch(RecommendationActions.loadRecommendations({ roomId: 1 }));
  }
}
