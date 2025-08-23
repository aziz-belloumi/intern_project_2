import { createReducer, on } from '@ngrx/store';
import {initialRecommendationState } from './recommendation.state';
import * as RecommendationActions from './recommendation.actions';

export const recommendationReducer = createReducer(
  initialRecommendationState,

  on(RecommendationActions.loadRecommendations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(RecommendationActions.loadRecommendationsSuccess, (state, { recommendations }) => ({
    ...state,
    loading: false,
    recommendations,
  })),

  on(RecommendationActions.loadRecommendationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
