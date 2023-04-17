import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPhotoService {
  private baseUrl = 'http://localhost:8080/users'; 

  constructor(private http: HttpClient, private sanitizer:DomSanitizer) { }




  // getUserPhoto(filename: string|null): Observable<Blob> {
  //   console.log('Filename:', filename);
  //   console.log('Full URL:', `${this.baseUrl}/uploads/${filename}`);
  //   return this.http.get(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' });
  // }

  // getUserPhoto(filename: string|null): Observable<Blob> {
  //   console.log('Filename:', filename);
  //   console.log('Full URL:', `${this.baseUrl}/uploads/${filename}`);
  //   return this.http.get(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' });
  // }


// ...

getUserPhoto(filename: string|null): Observable<Blob> {
  if (!filename || filename.trim() === '') {
    console.error('Filename is null or empty');
    return throwError(new Error('Filename is null or empty'));
  }

  console.log('Filename:', filename);
  console.log('Full URL:', `${this.baseUrl}/uploads/${filename}`);
  return this.http.get(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' });
}

  
  
}
