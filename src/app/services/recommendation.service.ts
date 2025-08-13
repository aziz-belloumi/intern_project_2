import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecommendRequest {
  user_id: number;
  purpose: string;
  attendees: number;
  target_date: string;      // Format: YYYY-MM-DD
  target_hours: number[];
  top_k: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private baseUrl = 'http://localhost:8000'; // Your FastAPI backend URL

  constructor(private http: HttpClient) {}

  getRecommendations(req: RecommendRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/recommend`, req);
  }

  getRoom(room_id: string): Observable<any> {
    const params = new HttpParams().set('room_id', room_id);
    return this.http.get(`${this.baseUrl}/room`, { params });
  }

  getUserPreferences(user_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${user_id}/preferences`);
  }
}
