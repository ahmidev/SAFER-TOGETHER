import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getLocationService(): Promise<any> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => {
        resolve({ lng: response.coords.longitude, lat: response.coords.latitude })

      })

    })
  }

  saveLocation(id: any, geolocation: any) {
    return this.http.put(`http://217.160.37.151:8080/users/geolocation/${id}`, geolocation)

  }

  getLocation() {
    return this.http.get("http://217.160.37.151:8080/users/")
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




