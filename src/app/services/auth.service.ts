import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/users'; // Adjust port if needed

  constructor(private http: HttpClient) {}

  // signin method
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password });
  }
  signUp(email: string, password: string) {}

  // Logout method (client-side only for JWT)
  logOut(): void {
    localStorage.removeItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
