import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserPhotoService } from '../Services/user-photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FavorisService } from '../Services/favoris.service';

@Component({
  selector: 'app-safer-list',
  templateUrl: './safer-list.component.html',
  styleUrls: ['./safer-list.component.css']
})
export class SaferListComponent implements OnInit {


  listSafer!: any[];
  isFav : boolean = false;
  saferId : any;
  userId : any;
  listFav!:any[];
  rating: number = 0;
  

  constructor(private http: HttpClient, private userPhotoService : UserPhotoService, private sanitizer: DomSanitizer, private favorisService : FavorisService){}

  getStarBackgroundWidth(index: number): string {
    const starValue = index + 1;
    if (this.rating >= starValue) {
      return '100%';
    } else if (this.rating > index && this.rating < starValue) {
      const percentage = (this.rating - index) * 100;
      return `${percentage}%`;
    }
    return '0%';
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    const url = 'http://localhost:8080/users/';
  


    this.http.get(url).subscribe((data: any) => {
      console.log("!!",data);
      
      this.listSafer = data.filter((user: any) => user.id !== this.userId);;
   

      
    });
    



    this.favorisService.getFavorites(this.userId).subscribe((fav:any) =>{
      this.listFav = fav
    })
    
    

  }
  setDefaultPhoto(safer: any): void {
    const defaultPhotoPath = 'assets/Safer3.svg'; 
    safer.photo = this.sanitizer.bypassSecurityTrustUrl(defaultPhotoPath);
  }
  // fetch(url, options)
  // .then(response => {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     throw new Error('Erreur réseau');
  //   }
  // })
  // .then(data => {
  //   // Traitement de la réponse de l'API
  // })
  // .catch(error => {
  //   console.error('Erreur :', error);
  // });




  userFavorite(id : any) : boolean {
    
    return this.listFav.some((favUser:any) => favUser.favoriteUser == id)
  
  
}
}