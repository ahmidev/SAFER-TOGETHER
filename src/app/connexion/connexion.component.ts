import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnect } from '../modele/UserConnect';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent{

  email!: string;
  password!: string;
  erreur:boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    console.log(this.email+this.password);
    
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Si la connexion réussit, stocker le token dans le localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('lastname', response.user.lastname);
        localStorage.setItem('firstname', response.user.firstname);
        localStorage.setItem('file', response.user.file);
        console.log(response);
        
        // Rediriger l'utilisateur vers une autre page
        this.router.navigate(['/profil']);
      },
      (error) => {
        // Si la connexion échoue, afficher un message d'erreur
        console.log('Erreur de connexion : ' + error);
      }
    );
  }





}
