import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'safer';
  connexion!:boolean;

  constructor(private guard: AuthGuard, private authService :AuthService){}


  ngOnInit(): void {
      this.connexion = this.authService.isLoggedIn();
  }

}
