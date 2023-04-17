import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnect } from '../modele/UserConnect';
import { AuthService } from '../Services/auth.service';
import { UserProfilService } from '../Services/user-profil.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{

  email!: string;
  password!: string;
  erreur:boolean = false;

  user:any;
  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfilService) { }



ngOnInit(): void {

}




  login(): void {
    console.log(this.email+this.password);
    
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Si la connexion réussit, stocker le token dans le localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('lastname', response.user.lastname);
        localStorage.setItem('firstname', response.user.firstname);
        localStorage.setItem('photo', response.user.photo);
       
        console.log(response.user);
        this.user = response.user;
        this.userProfileService.updateDataUser(response.user)
        
        this.authService.updateData(true) 
         console.log('user profi', this.user)

        // Rediriger l'utilisateur vers une autre page
        this.router.navigate(['/parentmap']);
      },
      (error) => {
        // Si la connexion échoue, afficher un message d'erreur
        console.log('Erreur de connexion : ' + error);
      }
    );
  }





}
