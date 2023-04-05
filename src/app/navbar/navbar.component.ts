import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(private authService : AuthService, private router : Router){}


  logOut(){
    this.authService.logout();
    this.router.navigate(['connexion'])
  }
}
