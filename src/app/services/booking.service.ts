import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "../models/booking.model";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5077/api/Booking'; // adjust your backend URL

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/create-booking`, booking);
  }

  getUserBookings(userId: number, lastBookingId: number = 0): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/get-all-bookings-of-user-by-chunks?userId=${userId}&lastBookingId=${lastBookingId}`);
  }

  getUserStatistics(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/get-user-statistics?userId=${userId}`);
  }

  getUserRecentBookings(userId: number):Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/get-recent-bookings?userId=${userId}`);
  }

  getAllRoomsAvailability(startTime?: string,endTime?: string) {
    return this.http.get<any>(`${this.apiUrl}/get-all-rooms-availability?startTime=${startTime}&endTime=${endTime}`);
  }

}
