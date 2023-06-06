import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  // public apiUrl: string = "http://localhost:8080";
  public apiUrl: string = "http://45.93.139.215:8080";
  // public apiUrl: string = "http://82.165.242.7:8080";
  constructor() { }
}
