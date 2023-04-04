import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserConnect } from '../modele/UserConnect';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private url = 'http://localhost:8080/auth/authenticate';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(this.url, body, httpOptions);
  }

  getToken(): string|null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      // Vérifier si le token est expiré
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  
getUserById(id: number): Observable<any> {
  return this.http.get(`http://localhost:8080/users/${id}`);
}

}
