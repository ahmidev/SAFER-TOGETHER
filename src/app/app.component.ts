import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'safer';
  connexion:boolean = false;

  constructor(private guard: AuthGuard, private authService :AuthService, public router: Router){}


  ngOnInit(): void {
     this.authService.currentData.subscribe(data => {this.connexion = data});

  }

  shouldShowComponent(route: string): boolean {
    switch (route) {
      case '/connexion':
      case '/':
      case '/home':
      case '/inscription':
      case '/admin':
      case '/reset-password':
      case '/request-reset-password':
      case '/register':
        return false;
        default:
          // méthode startsWith de JavaScript pour vérifier si la chaîne de caractères de la route commence par /reset-password.
          if (route.startsWith('/reset-password')) {
            return false;
          } else {
            return true;
          }
  }

}
  

}
