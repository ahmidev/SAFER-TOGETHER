import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 

  userId :  any;
  

  constructor(private authService : AuthService, private router : Router){}

  ngOnInit() {
  
    
    this.authService.getUserById(8).subscribe(data=>{
        console.log(data)
        this.userId = data
      })


}





  logOut(){
    this.authService.logout();
    this.router.navigate(['connexion'])
  }
}
