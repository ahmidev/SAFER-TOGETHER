import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  getLocationService():Promise<any>{

    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(response=>{
        resolve({lng: response.coords.longitude, lat: response.coords.latitude})
      })
    })
  }



}
