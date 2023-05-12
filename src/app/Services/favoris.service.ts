import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(private http: HttpClient , private globalService: GlobalService) { }


addFavorite(favorite : any){
  return this.http.post(`${this.globalService.apiUrl}/fav/create`,favorite)
}

getFavorites(id : any){
  return this.http.get(`${this.globalService.apiUrl}/fav/${id}`)

}

}
