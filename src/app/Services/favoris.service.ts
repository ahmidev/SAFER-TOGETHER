import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(private http: HttpClient) { }


addFavorite(favorite : any){
  return this.http.post('http://217.160.37.151:8080/fav/create',favorite)
}

getFavorites(id : any){
  return this.http.get(`http://217.160.37.151:8080/fav/${id}`)

}

}
