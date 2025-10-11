import { Injectable } from '@angular/core';
import {Room} from "../models/room.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface RoomSearchParams {
  searchTerm?: string;
  minCapacity?: number;
  maxCapacity?: number;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  hasProjector?: boolean;
  hasWhiteboard?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5077/api/Room';  // Change to your backend URL

  constructor(private http: HttpClient) {}


  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/get-all-rooms`);
  }


  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/get-room?roomId=${id}`);
  }

  getUserRooms(userId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/get-user-rooms?userId=${userId}`);
  }



  createRoom(room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/create-room`, room);
  }


  updateRoom(id: number, room: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/edit-room?roomId=${id}`, room);
  }


  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-room?roomId=${id}`);
  }

  searchRooms(params: RoomSearchParams): Observable<Room[]> {
    let httpParams = new HttpParams();

    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.minCapacity) httpParams = httpParams.set('minCapacity', params.minCapacity.toString());
    if (params.maxCapacity) httpParams = httpParams.set('maxCapacity', params.maxCapacity.toString());
    if (params.roomType) httpParams = httpParams.set('roomType', params.roomType);
    if (params.minPrice) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice) httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
    if (params.hasProjector !== undefined) httpParams = httpParams.set('hasProjector', params.hasProjector.toString());
    if (params.hasWhiteboard !== undefined) httpParams = httpParams.set('hasWhiteboard', params.hasWhiteboard.toString());

    return this.http.get<Room[]>(`${this.apiUrl}/search-rooms`, { params: httpParams });
  }
}
