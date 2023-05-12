import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = this.globalService.apiUrl;



  constructor(private http: HttpClient, private globalService: GlobalService) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/`);
  }



toggleUserStatus(id: number, active: boolean): Observable<any> {
  if (active) {
    return this.http.patch<any>(`${this.apiUrl}/users/invalidate/${id}`, null);
  } else {
    
    return this.http.patch<any>(`${this.apiUrl}/users/validate/${id}`, null);
  }
}

setUserDisconnected(userId: number): Observable<void> {
  const url = `${this.apiUrl}/auth/${userId}/disconnected`;
  return this.http.put<void>(url, {});
}


}
