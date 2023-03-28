import { Injectable } from '@angular/core';
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

  constructor() { }

  SignIn(user :UserConnect):Boolean{
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



}
