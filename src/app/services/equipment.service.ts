import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment} from '../models/equipment.model';

export interface EquipmentSearchParams {
  searchTerm?: string;
  type?: string;
  hasWarranty?: boolean;
  isPortable?: boolean;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'http://localhost:5077/api/Equipment';

  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/get-all-equipment`);
  }

  getUserEquipment(userId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/get-user-equipment/${userId}`);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/get-equipment/${id}`);
  }

  createEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.apiUrl}/create-equipment`, equipment);
  }

  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/update-equipment/${id}`, equipment);
  }

  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-equipment/${id}`);
  }

  searchEquipment(params: EquipmentSearchParams): Observable<Equipment[]> {
    let httpParams = new HttpParams();

    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.type) httpParams = httpParams.set('type', params.type);
    if (params.hasWarranty !== undefined) httpParams = httpParams.set('hasWarranty', params.hasWarranty.toString());
    if (params.isPortable !== undefined) httpParams = httpParams.set('isPortable', params.isPortable.toString());
    if (params.userId) httpParams = httpParams.set('userId', params.userId.toString());

    return this.http.get<Equipment[]>(`${this.apiUrl}/search-equipment`, { params: httpParams });
  }
}
