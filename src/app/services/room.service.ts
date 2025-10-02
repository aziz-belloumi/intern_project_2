import { Injectable } from '@angular/core';
import {Room} from "../models/room.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  getUserRooms(userId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/get-user-rooms?userId=${userId}`);
  }



  createRoom(room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/create-room`, room);
  }


  updateRoom(id: number, room: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }


  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
