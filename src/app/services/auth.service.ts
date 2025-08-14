import { Injectable } from '@angular/core'; //This makes it available to use through Angular’s Dependency Injection (DI) system.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/User';

  constructor(private http: HttpClient) { }

  signUp(user: { email: string, password: string, phoneNumber: number, firstName: string, lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, user);
  }



  signIn(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-in`, user).pipe(
      tap(response => localStorage.setItem('token', response.token)) // tap() is a side-effect operator.It lets you do something with the data without changing it.
    );
  }

  // signInWithGoogle(token: string): Observable<any> {
  //   // token is the Google ID token from the client
  //   return this.http.post<any>(`${this.apiUrl}/google-sign-in`, { token });
  // }

  logOut(): void {
    localStorage.removeItem('token');
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
}
