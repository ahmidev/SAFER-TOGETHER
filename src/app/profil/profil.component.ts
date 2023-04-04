import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  safers: any = [];
  safer: any;
  saferId: any;
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    let isloggedIn: string | null;
    let loggedUser: string | null;
    isloggedIn = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedIn != "true" || !loggedUser) {
      this.router.navigate(['/profil']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }







    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoidG90byB0YXRhIiwiZXhwIjoxNjgxMjM2ODk4LCJ1c2VySWQiOjYsImlhdCI6MTY4MDUxNjg5OCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.MTsATYT-Nwbch0U3rypLwfEW780htQCOyoAKcXLUUfw";

    const options = {
      method: 'GET', // Méthode HTTP (GET, POST, PUT, DELETE, etc.)
      headers: {
        'Authorization': 'Bearer ' + token, // Ajout du token d'authentification dans l'en-tête de la requête
        'Content-Type': 'application/json' // Définition du type de contenu de la requête (ici JSON)
      }
    }


    this.saferId = this.activatedRoute.snapshot.params['id'];
    // this.saferId = 5;

    console.log('alioune ', this.saferId);
    fetch(`http://localhost:8080/users/${this.saferId}`, options)
      .then((data) => data.json())

      .then((data) => {
        this.safer = data
        console.log(data);

      })


      .catch(error => console.log(error))













      ;

  }

}
