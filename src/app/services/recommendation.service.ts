import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8000/recommend';

  constructor(private http: HttpClient) {}

  getRecommendations(roomId: number): Observable<Room[]> {
    return this.http.post<any[]>(this.apiUrl, { id: roomId }).pipe(
      map(rooms =>
        rooms.map(r => ({
          id: r.Id,
          roomType: r.RoomType,
          capacity: r.Capacity,
          hasProjector: r.HasProjector,
          hasWhiteboard: r.HasWhiteboard,
          description: r.Description,
          pricePerMinute: r.PricePerMinute,
        }))
      )
    );
  }

}
