import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8000/recommend';

  constructor(private http: HttpClient) {}

  getRecommendations(roomId: number, topN: number = 8): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}?id=${roomId}&top_n=${topN}`);
  }

}
