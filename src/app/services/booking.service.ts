import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5077/api/Booking'; // adjust your backend URL

  constructor(private http: HttpClient) {}


  getUserBookings(userId: number, lastBookingId: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all-bookings-of-user-by-chunks?userId=${userId}&lastBookingId=${lastBookingId}`);
  }

  getUserStatistics(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-user-statistics?userId=${userId}`);
  }

  getUserRecentBookings(userId: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/get-recent-bookings?userId=${userId}`);
  }
}
