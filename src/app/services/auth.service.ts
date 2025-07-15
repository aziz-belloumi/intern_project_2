import { Injectable } from '@angular/core'; //This makes it available to use through Angular’s Dependency Injection (DI) system.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/Users'; // Adjust port if needed

  constructor(private http: HttpClient) { }

  signIn(user: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/signin`, JSON.stringify(user), { headers })
        .subscribe({
          next: (response) => {
            const token = response.token;
            localStorage.setItem('token', token);
            observer.next(response);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  signUp(user: { email: string, password: string, phoneNumber: number, firstName: string, lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }


  getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if(!token){
      return null ;
    }
    try {
      return jwtDecode<User>(token);
    }
    catch (e) {
      return null;
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  // Check if logged in , still some doughts about this method
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
