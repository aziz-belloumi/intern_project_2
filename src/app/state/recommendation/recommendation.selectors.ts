import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecommendationState } from './recommendation.state';

export const selectRecommendationState =
  createFeatureSelector<RecommendationState>('recommendation');

export const selectRecommendations = createSelector(
  selectRecommendationState,
  (state) => state.recommendations
);

export const selectRecommendationLoading = createSelector(
  selectRecommendationState,
  (state) => state.loading
);

export const selectRecommendationError = createSelector(
  selectRecommendationState,
  (state) => state.error
);
