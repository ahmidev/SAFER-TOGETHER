import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, of, throwError } from 'rxjs';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})

export class UserProfilService {


  private readonly apiUrl = `${this.globalService.apiUrl}/users`;
  

  private dataUser = new BehaviorSubject<any>(null);
  currentDataUser = this.dataUser.asObservable();




  public user !: {};
    token:string =  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWguYmFAc25jZi5mciIsImZ1bGxOYW1lIjoidG90byBtb3VzICIsImV4cCI6MTY4MTI0NjU1MiwidXNlcklkIjo4LCJpYXQiOjE2ODA1MjY1NTIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.7MYDV0h-WKhAI6t3Lf9560FZG84Jqqs3onjg6Eo0mqY"

  constructor(private http: HttpClient, private globalService: GlobalService) { }


  updateUserProfile(userId: number, userData: any, file?: File|null): Observable<any> {
    const formData = new FormData();
  
    // Ajouter les données utilisateur au formData
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key]);
      }
    }
  
    // Ajouter la photo au formData si elle existe
    if (file) {
      formData.append('photo', file);
    }
  
    return this.http.put(`${this.apiUrl}/${userId}/update`, formData).pipe(
      catchError(this.handleError)
    );
  }
  

  updateUserData(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/update`, userData).pipe(
      catchError(this.handleError)
    );
  }
  



  uploadPhoto(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

   

    return this.http.post(`${this.apiUrl}/${userId}/save-photo`, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never|string|boolean> {
    if (error.status === 200) {
      console.log('La photo a été téléchargée avec succès.');
      return of(true);
    } else {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      return throwError('Something went wrong; please try again later.');
    }
  }





  updateDataUser(data: any) {
    this.dataUser.next(data);
  }

  getUserById(id: number|string|null): Observable<any> {
   
    return this.http.get(`${this.globalService.apiUrl}/users/${id}`);
  }

  
  // getUserById(id: number): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   })
  //   return this.http.get(`http://localhost:8080/users/${id}` , { headers: headers });
  // }

  updateUser(users: any): Observable<any> {
    return this.http.put(`${this.globalService.apiUrl}/users/${users.id}`, users);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.globalService.apiUrl}/users/${id}`);
  }
  
}
