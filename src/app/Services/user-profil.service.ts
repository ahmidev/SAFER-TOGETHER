import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserProfilService {

  
    token:string =  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWguYmFAc25jZi5mciIsImZ1bGxOYW1lIjoidG90byBtb3VzICIsImV4cCI6MTY4MTI0NjU1MiwidXNlcklkIjo4LCJpYXQiOjE2ODA1MjY1NTIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.7MYDV0h-WKhAI6t3Lf9560FZG84Jqqs3onjg6Eo0mqY"




  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:8080/users/${id}` , { headers: headers });
  }

  updateUser(users: any): Observable<any> {
    return this.http.put(`http://localhost:8080/users/${users.id}`, users);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/users/${id}`);
  }
  
}
