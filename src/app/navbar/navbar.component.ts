import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 
  unreadMessageCount: number = 0;
  userId :  any;
  

  constructor(private authService : AuthService, private router : Router, private userService: UserService, private notificationService: NotificationService){}

  ngOnInit() {
    this.notificationService.unreadMessageCount$.subscribe((count) => {
      this.unreadMessageCount = count;
    });
    
  // this.authService.getUserById(8).subscribe(data=>{
  //   console.log(data , "mous")
  //   this.userId = data
  //     })

console.log(Number(localStorage.getItem('userId')));

}

  logOut(){
    this.userService.setUserDisconnected(Number(localStorage.getItem('userId'))).subscribe();
    this.authService.updateData(false);
    this.authService.logout();
    this.router.navigate(['connexion'])
  }
}
