import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnect } from '../modele/UserConnect';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  users: UserConnect[] = [{"email":"admin", "password":"123", "role":['ADMIN']},
  {"email":"mouss", "password":"123", "role":['USER']} ];

  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];

  constructor(private router: Router) { }

logout(){
this.isloggedIn = false;
this.loggedUser = undefined!;
this.roles = undefined!;
localStorage.removeItem('loggedUser');
localStorage.setItem('isloggedIn',String(this.isloggedIn));
this.router.navigate(['/connexion']);

  }

signIn(user :UserConnect):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
    if(user.email== curUser.email && user.password==curUser.password) {
    validUser = true;
    this.loggedUser = curUser.email;
    this.isloggedIn = true;
    this.roles = curUser.role;
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    }
    });
    return validUser;

}

isAdmin(): Boolean{
  if (!this.roles){ // this.roles == undefined
    return false

  }else{
    return (this.roles.indexOf('ADMIN') > -1)
  }

}

setLoggedUserFromLocalStorage(login : string){
  this.loggedUser = login;
  this.isloggedIn = true;
  this.getUserRoles(login);
}

getUserRoles(email : string){
  this.users.forEach((curUser) => {
    if(curUser.email == email){
      this.roles = curUser.role;
    }
  })
}


}
