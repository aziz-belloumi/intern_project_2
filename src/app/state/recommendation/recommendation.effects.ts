import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecommendationService } from '../../services/recommendation.service';
import * as RecommendationActions from './recommendation.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RecommendationEffects {

  constructor(private actions$: Actions, private recommendationService: RecommendationService) {}

  loadRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecommendationActions.loadRecommendations),
      mergeMap(({ roomId }) =>
        this.recommendationService.getRecommendations(roomId).pipe(
          map(recommendations =>
            RecommendationActions.loadRecommendationsSuccess({ recommendations })
          ),
          catchError(error =>
            of(RecommendationActions.loadRecommendationsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
