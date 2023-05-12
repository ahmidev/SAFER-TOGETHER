import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  public apiUrl: string = "http://service-api.fr:8080";
  constructor() { }
}
