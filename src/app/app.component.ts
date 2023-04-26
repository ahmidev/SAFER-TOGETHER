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
  connexion!:boolean;

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
        return false;
      default:
        return true;
    }
  }
  

}
