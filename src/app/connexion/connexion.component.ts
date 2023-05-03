import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnect } from '../modele/UserConnect';
import { AuthService } from '../Services/auth.service';
import { UserProfilService } from '../Services/user-profil.service';
import { PositionService } from '../Services/position.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  email!: string;
  password!: string;
  erreur: boolean = false;

  user: any;
  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfilService,
    private positionService: PositionService) { }



  ngOnInit(): void {
    // this.positionService.saveLocation(2, {latitude : 7896545, longitude : 123654}).subscribe(data => console.log(data))
  }


  login(): void {
    console.log(this.email + this.password);

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Si la connexion réussit, stocker le token dans le localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('lastname', response.user.lastname);
        localStorage.setItem('firstname', response.user.firstname);
        localStorage.setItem('photo', response.user.photo);
        localStorage.setItem('roles', JSON.stringify(response.user.roles));


        console.log( response.user);
        this.user = response.user;
        this.userProfileService.updateDataUser(response.user)

     
        console.log('user profil', this.user)

        const userId = Number(localStorage.getItem("userId"));

        this.positionService.getPosition().subscribe(
          (position) => {
            this.positionService.saveLocation(userId, { latitude: position.coords.latitude, longitude: position.coords.longitude }).subscribe(data => console.log(data))
            console.log("position accepter")
            console.log("position okkkk", position)
            console.log("usssssser", userId)

          }
        )
          // Vérifier si l'utilisateur a le rôle "ADMIN"
        const isAdmin = response.user.roles.some((role: { name: string; }) => role.name === 'ADMIN');

          // Rediriger l'utilisateur vers la page appropriée en fonction de son rôle
        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/parentmap']);
          this.authService.updateData(true)
        }
        

      },
      (error) => {
        // Si la connexion échoue, afficher un message d'erreur
        console.log('Erreur de connexion : ' + error);
      }
    );
  }





}
