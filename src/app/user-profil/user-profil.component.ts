import { Component, OnInit } from '@angular/core';
import { UserProfilService } from '../Services/user-profil.service';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit{

  user:any;

  constructor(private userProfilService: UserProfilService){

  }

ngOnInit(): void {
    this.userProfilService.getUserById(8).subscribe(data=>{
      console.log(data)
      this.user = data
    })
}

}
