import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

constructor(private http: HttpClient) { }

addReviews(review : any){
  return this.http.post("http://localhost:8080/reviews/create", review)
}

getReviews(){}


}
