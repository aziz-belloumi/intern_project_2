import { createAction, props } from '@ngrx/store';
import {Room} from "../../models/room.model";


// trigger load
export const loadRecommendations = createAction(
  '[Recommendation] Load Recommendations',
  props<{ roomId: number }>()
);

// success
export const loadRecommendationsSuccess = createAction(
  '[Recommendation] Load Recommendations Success',
  props<{ recommendations: Room[] }>()
);

// failure
export const loadRecommendationsFailure = createAction(
  '[Recommendation] Load Recommendations Failure',
  props<{ error: string }>()
);
