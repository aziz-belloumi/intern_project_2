import {Room} from "../../models/room.model";

export interface RecommendationState {
  recommendations: Room[];
  loading: boolean;
  error: string | null;
}

export const initialRecommendationState: RecommendationState = {
  recommendations: [],
  loading: false,
  error: null,
};
