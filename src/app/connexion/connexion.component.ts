import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnect } from '../modele/UserConnect';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  user = new UserConnect();

  constructor(private authService : AuthService, private router : Router){

  }

  onLoggedin(){
    console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
    this.router.navigate(['/profil']);
    else
    alert('Login ou mot de passe incorrecte!');
    }

    

  
}
