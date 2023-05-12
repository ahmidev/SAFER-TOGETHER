
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserPhotoService } from '../Services/user-photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FavorisService } from '../Services/favoris.service';
import { ReviewsService } from '../Services/reviews.service';
import { GlobalService } from '../Services/global.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userId: any;
  safers: any = [];
  safer: any;
  saferId: any;
  photoSafer:any;
  isFav : boolean = false;
  rating: number = 3.6;

  constructor(private globalService: GlobalService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private userPhotoService: UserPhotoService, private sanitizer: DomSanitizer, private favorisService: FavorisService, private reviewsService: ReviewsService) { }



back():void {
  this.router.navigate(["/parentmap"]);
  console.log("coucou");

}

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




  ngOnInit() {

    this.userId = Number(localStorage.getItem('userId'));
    // let isloggedIn: string | null;
    // let loggedUser: string | null;
    // isloggedIn = localStorage.getItem('isloggedIn');
    // loggedUser = localStorage.getItem('loggedUser');
    // if (isloggedIn!= "true" || !loggedUser){
    //   this.router.navigate(['/connexion']);
    // }else{
    //   this.authService.setLoggedUserFromLocalStorage(loggedUser);
    // }


    this.favorisService.getFavorites(this.userId).subscribe((data: any) => {
      console.log("listefaaaav", data);
      for (let fav of data) {
        if (fav.favoriteUser == this.saferId) {
          this.isFav = true
        }
      }
    }


    )





    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoidG90byB0YXRhIiwiZXhwIjoxNjgxMjM2ODk4LCJ1c2VySWQiOjYsImlhdCI6MTY4MDUxNjg5OCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.MTsATYT-Nwbch0U3rypLwfEW780htQCOyoAKcXLUUfw";

    const options = {
      method: 'GET', // Méthode HTTP (GET, POST, PUT, DELETE, etc.)
      headers: {
        'Authorization': 'Bearer ' + token, // Ajout du token d'authentification dans l'en-tête de la requête
        'Content-Type': 'application/json' // Définition du type de contenu de la requête (ici JSON)
      }


    }
    this.saferId = this.activatedRoute.snapshot.params['id'];


  this.http.get(`${this.globalService.apiUrl}/users/${this.saferId}`).subscribe(async (data:any)=>{
    this.safer = data;
    

  },
  (error) => {

  // Mettre une photo par défaut si aucune photo n'est chargée
  this.setDefaultPhoto();
  }
  )



        }



  setDefaultPhoto(): void {
    const defaultPhotoPath = 'assets/Safer1.svg';
    this.photoSafer = this.sanitizer.bypassSecurityTrustUrl(defaultPhotoPath);
  }

next():void {
  this.router.navigate(["/discussion", this.saferId]);
  console.log("coucou");
}


  favoris() {
    if (this.isFav) {
      return console.log('utilisateur déjà en base de donnée');

    }
    this.favorisService.addFavorite({ user: this.userId, favoriteUser: this.saferId }).subscribe((data: any) => {
      console.log("daaaataaa", data);

      this.isFav = true;
    },
      (error) => {
        console.log(error);

      }
    )



  }

}
