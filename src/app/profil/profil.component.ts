import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

constructor( private authService : AuthService , private router : Router ) { }


  ngOnInit(){
    // let isloggedIn: string | null;
    // let loggedUser: string | null;
    // isloggedIn = localStorage.getItem('isloggedIn');
    // loggedUser = localStorage.getItem('loggedUser');
    // if (isloggedIn!= "true" || !loggedUser){
    //   this.router.navigate(['/connexion']);
    // }else{
    //   this.authService.setLoggedUserFromLocalStorage(loggedUser);
    // }



}
}
