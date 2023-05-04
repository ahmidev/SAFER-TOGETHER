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
    // const token = localStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoidGF0YSB0b3RvIiwiZXhwIjoxNjgwOTkxNTQ5LCJ1c2VySWQiOjQsImlhdCI6MTY4MDI3MTU0OSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.Ul0A7TCmPy3kzkF5mKpH-psI92hGgO_B8WIr2HnYSMo";
    const url = 'http://217.160.37.151:8080/users/';
    // const options = {
    //   method: 'GET', // Méthode HTTP (GET, POST, PUT, DELETE, etc.)
    //   headers: {
    //     'Authorization': 'Bearer ' + token, // Ajout du token d'authentification dans l'en-tête de la requête
    //     'Content-Type': 'application/json' // Définition du type de contenu de la requête (ici JSON)
    //   }
    // }


    this.http.get(url).subscribe((data: any) => {
      console.log("!!",data);

      this.listSafer = data;
      this.listSafer.forEach(async (safer) => {

        if (safer.photo) {
          (await this.userPhotoService.getUserPhoto(safer.photo)).subscribe(
            (photoBlob: Blob) => {
              console.log('Photo Blob:', photoBlob);
              safer.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
              console.log(this.listSafer[0].photo);
              console.log(safer.photo);
            });

        } else {
          // Mettre une photo par défaut si la photo est null ou vide
          this.setDefaultPhoto(safer);
        }
      });

      this.listSafer = data.filter((user: any) => user.id !== this.userId);;
      // this.listSafer.forEach(async (safer) => {

      //   if (safer.photo) {
      //     (await this.userPhotoService.getUserPhoto(safer.photo)).subscribe(
      //       (photoBlob: Blob) => {
      //         console.log('Photo Blob:', photoBlob);
      //         safer.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
      //         console.log(this.listSafer[0].photo);
      //         console.log(safer.photo);
      //       });

      //   } else {
      //     // Mettre une photo par défaut si la photo est null ou vide
      //     this.setDefaultPhoto(safer);
      //   }
      // });


    });


    // fetch(url, options)
    //   .then(response => {
    //     // Manipuler les données des utilisateurs ici
    //     console.log(" utilisateur connecté", response);
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Erreur réseau');
    //     }
    //   })
    //   .then(data => {
    //     // Traitement de la réponse de l'API
    //     console.log(data);

    //     this.listSafer = data;
    //   })
    //   .catch(error => {
    //     console.error('Erreur :', error);
    //   });
    // ;

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