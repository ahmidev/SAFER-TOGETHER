import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(private http: HttpClient) { }


addFavorite(favorite : any){
  return this.http.post('http://localhost:8080/fav/create',favorite)
}

getFavorites(id : any){
  return this.http.get(`http://localhost:8080/fav/${id}`)

}

}
