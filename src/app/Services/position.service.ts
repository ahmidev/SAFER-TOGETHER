import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  getLocationService(): Promise<any> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => {
        resolve({ lng: response.coords.longitude, lat: response.coords.latitude })

      })

    })
  }

  saveLocation(id: any, geolocation: any) {
    return this.http.put(`${this.globalService.apiUrl}/users/geolocation/${id}`, geolocation)

  }

  getLocation() {
    return this.http.get(`${this.globalService.apiUrl}/users/`)
  }

  getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error('La géolocalisation n\'est pas supportée par ce navigateur.');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      }
    });
  }
}




