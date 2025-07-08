import { Injectable } from '@angular/core'; //This makes it available to use through Angular’s Dependency Injection (DI) system.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/Users'; // Adjust port if needed

  constructor(private http: HttpClient) { }

  // signin method
  signIn(user: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/signin`, JSON.stringify(user),{headers});
  }
  signUp(user: { email: string, password: string, phoneNumber: number, firstName: string, lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }


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
