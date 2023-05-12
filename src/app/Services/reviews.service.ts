import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

constructor(private http: HttpClient, private globalService: GlobalService) { }

addReviews(review : any){
  return this.http.post(`${this.globalService.apiUrl}/reviews/create`, review)
}

getReviews(){}


}
