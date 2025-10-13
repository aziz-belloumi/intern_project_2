import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentBooking, EquipmentBookingStatus } from '../models/equipment-booking.model';

export interface EquipmentBookingSearchParams {
  userId?: number;
  equipmentId?: number;
  status?: EquipmentBookingStatus;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentBookingService {
  private apiUrl = 'http://localhost:5077/api/EquipmentBooking';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<EquipmentBooking[]> {
    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/get-all-bookings`);
  }

  getUserBookings(userId: number): Observable<EquipmentBooking[]> {
    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/get-user-bookings/${userId}`);
  }

  getEquipmentBookings(equipmentId: number): Observable<EquipmentBooking[]> {
    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/get-equipment-bookings/${equipmentId}`);
  }

  getPendingBookings(userId: number): Observable<EquipmentBooking[]> {
    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/get-pending-bookings/${userId}`);
  }

  getBookingById(id: number): Observable<EquipmentBooking> {
    return this.http.get<EquipmentBooking>(`${this.apiUrl}/get-booking/${id}`);
  }

  createBooking(booking: EquipmentBooking): Observable<EquipmentBooking> {
    return this.http.post<EquipmentBooking>(`${this.apiUrl}/create-booking`, booking);
  }

  updateBookingStatus(bookingId: number, status: EquipmentBookingStatus): Observable<EquipmentBooking> {
    return this.http.put<EquipmentBooking>(`${this.apiUrl}/update-status/${bookingId}`, { status });
  }

  confirmBooking(bookingId: number): Observable<EquipmentBooking> {
    return this.http.post<EquipmentBooking>(`${this.apiUrl}/confirm-booking/${bookingId}`, {});
  }

  cancelBooking(bookingId: number): Observable<EquipmentBooking> {
    return this.http.post<EquipmentBooking>(`${this.apiUrl}/cancel-booking/${bookingId}`, {});
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-booking/${id}`);
  }

  searchBookings(params: EquipmentBookingSearchParams): Observable<EquipmentBooking[]> {
    let httpParams = new HttpParams();

    if (params.userId) httpParams = httpParams.set('userId', params.userId.toString());
    if (params.equipmentId) httpParams = httpParams.set('equipmentId', params.equipmentId.toString());
    if (params.status !== undefined) httpParams = httpParams.set('status', params.status.toString());
    if (params.startDate) httpParams = httpParams.set('startDate', params.startDate);
    if (params.endDate) httpParams = httpParams.set('endDate', params.endDate);

    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/search-bookings`, { params: httpParams });
  }
}
