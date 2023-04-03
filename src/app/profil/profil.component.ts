import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

constructor(public router : Router){

}

back():void {
  this.router.navigate(["/safer-list"]);
  console.log("coucou");
  
}

next():void {
  this.router.navigate(["/discussion"]);
  console.log("coucou");
}


}
