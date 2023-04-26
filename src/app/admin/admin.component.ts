import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  users: any[] = [];

  constructor(private userService: UserService,private authService : AuthService, private router : Router) { }





  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      
      console.log(this.users);
    });
  
    
  }



toggleUserStatus(user: User): void {
  this.userService.toggleUserStatus(user.id, user.active).subscribe(updatedUser => {
    user.active = updatedUser.active;
    console.log(updatedUser);
    
  });

}
logOut(){
  this.authService.logout();
  this.router.navigate(['connexion'])
}


}
