import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserProfilService {

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<any> {
    return this.http.get(`/api/users/${id}`);
  }

  updateUser(users: any): Observable<any> {
    return this.http.put(`/api/users/${users.id}`, users);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`/api/users/${id}`);
  }
  
}
